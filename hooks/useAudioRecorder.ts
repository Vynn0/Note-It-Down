import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as audioService from '../services/audioService';
import { summarizeText } from '../services/summarizeService';
import { saveSummary } from '../services/storageService';

export default function useAudioRecorder() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [transcription, setTranscription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [permissionGranted, setPermissionGranted] = useState(false);

    // Request microphone permission
    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            setPermissionGranted(status === 'granted');
        })();
    }, []);

    const handleStartRecording = async () => {
        try {
            setError('');
            const newRecording = await audioService.startRecording();
            setRecording(newRecording);
        } catch (err: any) {
            setError('Failed to start recording: ' + (err?.message || String(err)));
        }
    };

    const handleStopRecording = async () => {
        if (!recording) {
            setError('No active recording found');
            return;
        }

        try {
            setIsLoading(true);
            const recordingInstance = recording;
            setRecording(null);

            // Get transcription
            const text = await audioService.stopRecordingAndTranscribe(recordingInstance);
            setTranscription(text);

            // Auto-summarize if transcription is successful and has content
            if (text && text.trim().length > 10) {
                try {
                    const summary = await summarizeText(text);
                    await saveSummary(summary);
                } catch (summaryError: any) {
                    console.warn('Failed to summarize:', summaryError.message);
                    // Don't show error to user, just log it
                }
            }
        } catch (err: any) {
            setError('Transcription failed: ' + (err?.message || String(err)));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        recording,
        transcription,
        isLoading,
        error,
        permissionGranted,
        startRecording: handleStartRecording,
        stopRecording: handleStopRecording,
    };
}