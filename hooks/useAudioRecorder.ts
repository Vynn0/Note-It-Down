import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as audioService from '../services/audioService';

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

            const text = await audioService.stopRecordingAndTranscribe(recordingInstance);
            setTranscription(text);
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