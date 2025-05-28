import { Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';
import useAudioRecorder from '../../hooks/useAudioRecorder';

export default function TabTwoScreen() {
  const {
    recording,
    transcription,
    isLoading,
    error,
    permissionGranted,
    startRecording,
    stopRecording
  } = useAudioRecorder();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech to Text</Text>

      {recording ? (
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>Recording in progress...</Text>
        </View>
      ) : (
        <Text style={styles.instructions}>
          Bicara dengan jelas dalam Bahasa Indonesia. Jaga jarak ponsel sekitar 15-20cm dari mulut Anda.
        </Text>
      )}

      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
        disabled={isLoading || !permissionGranted}
      />

      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : transcription ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Transkripsi:</Text>
          <Text style={styles.resultText}>{transcription}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  resultLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
    marginRight: 8,
  },
  recordingText: {
    color: 'red',
  },
  instructions: {
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});