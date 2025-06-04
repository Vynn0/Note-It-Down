import { Audio } from 'expo-av';
import { getWhisperModel } from './storageService';

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

export const startRecording = async (): Promise<Audio.Recording> => {
    // Set audio mode for recording
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
    });

    // Create and prepare a new recording
    const newRecording = new Audio.Recording();
    await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await newRecording.startAsync();

    return newRecording;
};

export const stopRecordingAndTranscribe = async (
    recording: Audio.Recording
): Promise<string> => {
    // Stop the recording
    await recording.stopAndUnloadAsync();

    // Get the recording URI
    const uri = recording.getURI();
    if (!uri) {
        throw new Error('Recording URI is null');
    }

    // Get the selected Whisper model
    const selectedModel = await getWhisperModel();

    // Create FormData for API request
    const formData = new FormData();
    formData.append('model', selectedModel);
    formData.append('language', 'id');

    // Append the audio file
    const fileInfo = {
        uri: uri,
        type: 'audio/mpeg',
        name: 'recording.m4a',
    };
    // @ts-ignore - React Native's FormData implementation has different typing
    formData.append('file', fileInfo);

    // Send to Groq API
    const response = await fetch(
        'https://api.groq.com/openai/v1/audio/transcriptions',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: formData,
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API ${response.status}: ${errorBody}`);
    }

    const result = await response.json();
    return result.text;
};