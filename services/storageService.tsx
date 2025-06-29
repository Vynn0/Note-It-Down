import AsyncStorage from '@react-native-async-storage/async-storage';
import { Summary } from './summarizeService';
import { db, getCurrentUser } from '@/firebase/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';

const SUMMARIES_KEY = 'summaries';
const WHISPER_MODEL_KEY = 'whisperModel';
const GROQ_API_KEY = 'groqApiKey';
const GEMINI_API_KEY = 'geminiApiKey';

// API Key functions
export const saveGroqApiKey = async (apiKey: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(GROQ_API_KEY, apiKey);
  } catch (error) {
    throw new Error('Failed to save Groq API key');
  }
};

export const getGroqApiKey = async (): Promise<string> => {
  try {
    const apiKey = await AsyncStorage.getItem(GROQ_API_KEY);
    return apiKey || process.env.EXPO_PUBLIC_GROQ_API_KEY || '';
  } catch (error) {
    return process.env.EXPO_PUBLIC_GROQ_API_KEY || '';
  }
};

export const saveGeminiApiKey = async (apiKey: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(GEMINI_API_KEY, apiKey);
  } catch (error) {
    throw new Error('Failed to save Gemini API key');
  }
};

export const getGeminiApiKey = async (): Promise<string> => {
  try {
    const apiKey = await AsyncStorage.getItem(GEMINI_API_KEY);
    return apiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
  } catch (error) {
    return process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
  }
};

export const clearApiKey = async (keyType: 'groq' | 'gemini'): Promise<void> => {
  try {
    const key = keyType === 'groq' ? GROQ_API_KEY : GEMINI_API_KEY;
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error(`Failed to clear ${keyType} API key`);
  }
};

// Firebase functions
export const saveSummaryToFirebase = async (summary: Summary): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const summaryData = {
      ...summary,
      userId: user.uid,
      createdAt: new Date(summary.createdAt)
    };

    await addDoc(collection(db, 'summaries'), summaryData);
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    throw new Error('Failed to save summary to Firebase');
  }
};

export const getSummariesFromFirebase = async (): Promise<Summary[]> => {
  try {
    const user = getCurrentUser();
    if (!user) {
      return [];
    }

    const q = query(
      collection(db, 'summaries'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const summaries: Summary[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      summaries.push({
        id: doc.id,
        title: data.title,
        content: data.content,
        originalText: data.originalText,
        createdAt: data.createdAt.toDate().toISOString(),
      });
    });

    return summaries;
  } catch (error) {
    console.error('Error getting summaries from Firebase:', error);
    return [];
  }
};

export const deleteSummaryFromFirebase = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'summaries', id));
  } catch (error) {
    console.error('Error deleting from Firebase:', error);
    throw new Error('Failed to delete summary from Firebase');
  }
};

// Hybrid functions (Firebase + Local Storage fallback)
export const saveSummary = async (summary: Summary): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (user) {
      // Save to Firebase if user is logged in
      await saveSummaryToFirebase(summary);
    } else {
      // Save to local storage if no user
      const existingSummaries = await getSummaries();
      const updatedSummaries = [summary, ...existingSummaries];
      await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(updatedSummaries));
    }
  } catch (error) {
    // Fallback to local storage if Firebase fails
    const existingSummaries = await getSummaries();
    const updatedSummaries = [summary, ...existingSummaries];
    await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(updatedSummaries));
  }
};

export const getSummaries = async (): Promise<Summary[]> => {
  try {
    const user = getCurrentUser();
    if (user) {
      // Get from Firebase if user is logged in
      return await getSummariesFromFirebase();
    } else {
      // Get from local storage if no user
      const summariesJson = await AsyncStorage.getItem(SUMMARIES_KEY);
      return summariesJson ? JSON.parse(summariesJson) : [];
    }
  } catch (error) {
    // Fallback to local storage
    const summariesJson = await AsyncStorage.getItem(SUMMARIES_KEY);
    return summariesJson ? JSON.parse(summariesJson) : [];
  }
};

export const deleteSummary = async (id: string): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (user) {
      // Delete from Firebase if user is logged in
      await deleteSummaryFromFirebase(id);
    } else {
      // Delete from local storage if no user
      const summaries = await getSummaries();
      const filteredSummaries = summaries.filter(summary => summary.id !== id);
      await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(filteredSummaries));
    }
  } catch (error) {
    // Fallback to local storage
    const summaries = await getSummaries();
    const filteredSummaries = summaries.filter(summary => summary.id !== id);
    await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(filteredSummaries));
  }
};

// Migration function to move local summaries to Firebase
export const migrateLocalSummariesToFirebase = async (): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const localSummariesJson = await AsyncStorage.getItem(SUMMARIES_KEY);
    if (!localSummariesJson) {
      return; // No local summaries to migrate
    }

    const localSummaries: Summary[] = JSON.parse(localSummariesJson);
    
    for (const summary of localSummaries) {
      const summaryData = {
        ...summary,
        userId: user.uid,
        createdAt: new Date(summary.createdAt)
      };
      await addDoc(collection(db, 'summaries'), summaryData);
    }

    // Clear local storage after successful migration
    await AsyncStorage.removeItem(SUMMARIES_KEY);
    console.log('Successfully migrated summaries to Firebase');
  } catch (error) {
    console.error('Error migrating summaries:', error);
    throw new Error('Failed to migrate summaries to Firebase');
  }
};

// Whisper model functions (still use local storage)
export const saveWhisperModel = async (model: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(WHISPER_MODEL_KEY, model);
  } catch (error) {
    throw new Error('Failed to save whisper model');
  }
};

export const getWhisperModel = async (): Promise<string> => {
  try {
    const model = await AsyncStorage.getItem(WHISPER_MODEL_KEY);
    return model || 'whisper-large-v3';
  } catch (error) {
    return 'whisper-large-v3';
  }
};

export const saveGeminiSettings = async (settings: {
  prompt?: string;
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
}) => {
  try {
    await AsyncStorage.setItem('gemini_settings', JSON.stringify(settings));
  } catch (error) {
    throw new Error('Failed to save Gemini settings');
  }
};

export const getGeminiSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem('gemini_settings');
    if (settings) {
      return JSON.parse(settings);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const clearGeminiSettings = async () => {
  try {
    await AsyncStorage.removeItem('gemini_settings');
  } catch (error) {
    throw new Error('Failed to clear Gemini settings');
  }
};