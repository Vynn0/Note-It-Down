import AsyncStorage from '@react-native-async-storage/async-storage';
import { Summary } from './summarizeService';

const SUMMARIES_KEY = 'summaries';
const WHISPER_MODEL_KEY = 'whisperModel';

export const saveSummary = async (summary: Summary): Promise<void> => {
    try {
        const existingSummaries = await getSummaries();
        const updatedSummaries = [summary, ...existingSummaries];
        await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(updatedSummaries));
    } catch (error) {
        throw new Error('Failed to save summary');
    }
};

export const getSummaries = async (): Promise<Summary[]> => {
    try {
        const summariesJson = await AsyncStorage.getItem(SUMMARIES_KEY);
        return summariesJson ? JSON.parse(summariesJson) : [];
    } catch (error) {
        return [];
    }
};

export const deleteSummary = async (id: string): Promise<void> => {
    try {
        const summaries = await getSummaries();
        const filteredSummaries = summaries.filter(summary => summary.id !== id);
        await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(filteredSummaries));
    } catch (error) {
        throw new Error('Failed to delete summary');
    }
};

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
        return model || 'whisper-large-v3'; // default model
    } catch (error) {
        return 'whisper-large-v3'; // default model
    }
};