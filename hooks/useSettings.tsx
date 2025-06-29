import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  saveWhisperModel,
  getWhisperModel,
  saveGroqApiKey,
  getGroqApiKey,
  saveGeminiApiKey,
  getGeminiApiKey,
  clearApiKey,
  saveGeminiSettings,
  getGeminiSettings,
  clearGeminiSettings
} from '@/services/storageService';
import { getDefaultPrompt, getDefaultSettings } from '@/services/summarizeService';

export interface SettingsState {
  selectedModel: string;
  dropdownVisible: boolean;
  groqApiKey: string;
  geminiApiKey: string;
  isUsingDefaultGroq: boolean;
  isUsingDefaultGemini: boolean;
  showAdvancedSettings: boolean;
  useCustomPrompt: boolean;
  customPrompt: string;
  temperature: string;
  topK: string;
  topP: string;
  maxOutputTokens: string;
}

export const useSettings = () => {
  const [state, setState] = useState<SettingsState>({
    selectedModel: 'whisper-large-v3',
    dropdownVisible: false,
    groqApiKey: '',
    geminiApiKey: '',
    isUsingDefaultGroq: false,
    isUsingDefaultGemini: false,
    showAdvancedSettings: false,
    useCustomPrompt: false,
    customPrompt: '',
    temperature: '0.7',
    topK: '1',
    topP: '1',
    maxOutputTokens: '4096',
  });

  useEffect(() => {
    loadAllSettings();
  }, []);

  const loadAllSettings = async () => {
    await Promise.all([
      loadSelectedModel(),
      loadApiKeys(),
      loadGeminiSettings(),
    ]);
  };

  const loadSelectedModel = async () => {
    try {
      const model = await getWhisperModel();
      setState(prev => ({ ...prev, selectedModel: model }));
    } catch (error) {
      console.error('Failed to load selected model:', error);
    }
  };

  const loadApiKeys = async () => {
    try {
      const groqKey = await getGroqApiKey();
      const geminiKey = await getGeminiApiKey();
      
      const defaultGroqKey = process.env.EXPO_PUBLIC_GROQ_API_KEY || '';
      const defaultGeminiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
      
      const isUsingDefaultGroq = groqKey === defaultGroqKey;
      const isUsingDefaultGemini = geminiKey === defaultGeminiKey;
      
      setState(prev => ({
        ...prev,
        isUsingDefaultGroq,
        isUsingDefaultGemini,
        groqApiKey: isUsingDefaultGroq ? '' : groqKey,
        geminiApiKey: isUsingDefaultGemini ? '' : geminiKey,
      }));
    } catch (error) {
      console.error('Failed to load API keys:', error);
    }
  };

  const loadGeminiSettings = async () => {
    try {
      const settings = await getGeminiSettings();
      const defaults = getDefaultSettings();
      
      if (settings) {
        setState(prev => ({
          ...prev,
          useCustomPrompt: !!settings.prompt,
          customPrompt: settings.prompt || getDefaultPrompt(),
          temperature: (settings.temperature ?? defaults.temperature).toString(),
          topK: (settings.topK ?? defaults.topK).toString(),
          topP: (settings.topP ?? defaults.topP).toString(),
          maxOutputTokens: (settings.maxOutputTokens ?? defaults.maxOutputTokens).toString(),
        }));
      } else {
        setState(prev => ({
          ...prev,
          customPrompt: getDefaultPrompt(),
          temperature: defaults.temperature.toString(),
          topK: defaults.topK.toString(),
          topP: defaults.topP.toString(),
          maxOutputTokens: defaults.maxOutputTokens.toString(),
        }));
      }
    } catch (error) {
      console.error('Failed to load Gemini settings:', error);
    }
  };

  const updateState = (updates: Partial<SettingsState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleModelSelect = async (modelValue: string) => {
    try {
      await saveWhisperModel(modelValue);
      setState(prev => ({ ...prev, selectedModel: modelValue, dropdownVisible: false }));
      Alert.alert('Success', 'Whisper model updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save model selection');
    }
  };

  const handleSaveGroqApiKey = async () => {
    try {
      if (state.groqApiKey.trim()) {
        await saveGroqApiKey(state.groqApiKey.trim());
        setState(prev => ({ ...prev, isUsingDefaultGroq: false }));
        Alert.alert('Success', 'Groq API key saved successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save Groq API key');
    }
  };

  const handleSaveGeminiApiKey = async () => {
    try {
      if (state.geminiApiKey.trim()) {
        await saveGeminiApiKey(state.geminiApiKey.trim());
        setState(prev => ({ ...prev, isUsingDefaultGemini: false }));
        Alert.alert('Success', 'Gemini API key saved successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save Gemini API key');
    }
  };

  const handleClearGroqApiKey = async () => {
    try {
      await clearApiKey('groq');
      setState(prev => ({ ...prev, groqApiKey: '', isUsingDefaultGroq: true }));
      Alert.alert('Success', 'Groq API key cleared. Using default key.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear Groq API key');
    }
  };

  const handleClearGeminiApiKey = async () => {
    try {
      await clearApiKey('gemini');
      setState(prev => ({ ...prev, geminiApiKey: '', isUsingDefaultGemini: true }));
      Alert.alert('Success', 'Gemini API key cleared. Using default key.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear Gemini API key');
    }
  };

  const handleSaveGeminiSettings = async () => {
    try {
      const settings: any = {};
      
      if (state.useCustomPrompt && state.customPrompt.trim()) {
        settings.prompt = state.customPrompt.trim();
      }
      
      const tempNum = parseFloat(state.temperature);
      const topKNum = parseInt(state.topK);
      const topPNum = parseFloat(state.topP);
      const maxTokensNum = parseInt(state.maxOutputTokens);
      
      if (!isNaN(tempNum) && tempNum >= 0 && tempNum <= 2) {
        settings.temperature = tempNum;
      }
      if (!isNaN(topKNum) && topKNum > 0) {
        settings.topK = topKNum;
      }
      if (!isNaN(topPNum) && topPNum >= 0 && topPNum <= 1) {
        settings.topP = topPNum;
      }
      if (!isNaN(maxTokensNum) && maxTokensNum > 0) {
        settings.maxOutputTokens = maxTokensNum;
      }
      
      await saveGeminiSettings(settings);
      Alert.alert('Success', 'Gemini settings saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save Gemini settings');
    }
  };

  const handleResetGeminiSettings = async () => {
    try {
      await clearGeminiSettings();
      await loadGeminiSettings();
      setState(prev => ({ ...prev, useCustomPrompt: false }));
      Alert.alert('Success', 'Gemini settings reset to defaults!');
    } catch (error) {
      Alert.alert('Error', 'Failed to reset Gemini settings');
    }
  };

  return {
    state,
    updateState,
    handleModelSelect,
    handleSaveGroqApiKey,
    handleSaveGeminiApiKey,
    handleClearGroqApiKey,
    handleClearGeminiApiKey,
    handleSaveGeminiSettings,
    handleResetGeminiSettings,
  };
};