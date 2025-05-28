import { Audio } from 'expo-av';

// API key should be in .env file and accessed through process.env
// For simplicity in this example, we'll use the key directly
const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

/**
 * Start audio recording
 * @returns A new Audio.Recording instance if successful
 * @throws Error if recording fails to start
 */
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

/**
 * Stop recording and transcribe the audio
 * @param recording The active recording to stop and transcribe
 * @returns The transcribed text
 * @throws Error if transcription fails
 */
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

    // Create FormData for API request
    const formData = new FormData();
    formData.append('model', 'whisper-large-v3-turbo');
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