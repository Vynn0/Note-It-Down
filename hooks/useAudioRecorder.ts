import { useState, useEffect, useRef } from 'react';
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
    const [recordingTime, setRecordingTime] = useState(0);

    // Fix: Use number instead of NodeJS.Timeout for React Native
    const timerRef = useRef<number | null>(null);

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
            setRecordingTime(0);
            const newRecording = await audioService.startRecording();
            setRecording(newRecording);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000) as unknown as number;
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

            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            const recordingInstance = recording;
            setRecording(null);

            const text = await audioService.stopRecordingAndTranscribe(recordingInstance);
            setTranscription(text);

            // Auto-summarize if transcription is successful and has content
            if (text && text.trim().length > 10) {
                try {
                    const summary = await summarizeText(text);
                    await saveSummary(summary);
                } catch (summaryError: any) {
                    console.warn('Failed to summarize:', summaryError.message);
                }
            }
        } catch (err: any) {
            setError('Transcription failed: ' + (err?.message || String(err)));
        } finally {
            setIsLoading(false);
            setRecordingTime(0); // Reset timer after processing
        }
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return {
        recording,
        transcription,
        isLoading,
        error,
        permissionGranted,
        recordingTime,
        startRecording: handleStartRecording,
        stopRecording: handleStopRecording,
    };
}