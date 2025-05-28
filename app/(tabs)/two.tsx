import { Button, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
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
    recordingTime,
    startRecording,
    stopRecording
  } = useAudioRecorder();

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Speech to Text</Text>

        {recording ? (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <View style={styles.recordingTextContainer}>
              <Text style={styles.recordingText}>Recording in progress...</Text>
              <Text style={styles.recordingTimer}>{formatTime(recordingTime)}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.instructions}>
            Bicara dengan jelas dalam Bahasa Indonesia. Jaga jarak ponsel sekitar 15-20cm dari mulut Anda.
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording}
            disabled={isLoading || !permissionGranted}
          />
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" style={styles.loader} />
            <Text style={styles.loadingText}>
              Processing transcription and generating summary...
            </Text>
          </View>
        )}

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : transcription ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Transkripsi:</Text>
            <ScrollView
              style={styles.transcriptionScroll}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
            >
              <Text style={styles.resultText}>{transcription}</Text>
            </ScrollView>
            <Text style={styles.successText}>
              ✅ Summary saved! Check the Summaries tab.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loader: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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
    maxHeight: 300,
  },
  resultLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  transcriptionScroll: {
    maxHeight: 180,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
  },
  successText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
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
    marginRight: 12,
  },
  recordingTextContainer: {
    alignItems: 'center',
  },
  recordingText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
  },
  recordingTimer: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    fontFamily: 'monospace', // Makes numbers align better
  },
  instructions: {
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});