import { StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl, Clipboard } from 'react-native';
import { Text, View } from '@/components/Themed';
import useSummaries from '@/hooks/useSummaries';
import { Summary } from '@/services/summarizeService';

export default function TabOneScreen() {
  const { summaries, isLoading, error, refreshSummaries, deleteSummary } = useSummaries();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await Clipboard.setString(text);
      Alert.alert('Copied!', `${type} copied to clipboard`);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const handleSummaryPress = (summary: Summary) => {
    Alert.alert(
      summary.title,
      summary.content,
      [
        {
          text: 'View Original',
          onPress: () => {
            Alert.alert(
              'Original Transcription',
              summary.originalText,
              [
                {
                  text: 'Copy',
                  onPress: () => copyToClipboard(summary.originalText, 'Original text'),
                },
                { text: 'Close', style: 'cancel' },
              ],
              { cancelable: true }
            );
          },
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDelete(summary),
        },
        { text: 'Close', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = (summary: Summary) => {
    Alert.alert(
      'Delete Summary',
      `Are you sure you want to delete "${summary.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteSummary(summary.id);
            Alert.alert('Deleted', 'Summary has been deleted');
          }
        },
      ],
      { cancelable: true }
    );
  };


  const handleQuickCopy = (summary: Summary) => {
    Alert.alert(
      'Quick Copy',
      'What would you like to copy?',
      [
        {
          text: 'Copy Summary',
          onPress: () => copyToClipboard(summary.content, 'Summary'),
        },
        {
          text: 'Copy Original',
          onPress: () => copyToClipboard(summary.originalText, 'Original text'),
        },
        {
          text: 'Copy Both',
          onPress: () => {
            const combinedText = `Title: ${summary.title}\n\nSummary:\n${summary.content}\n\nOriginal Text:\n${summary.originalText}`;
            copyToClipboard(combinedText, 'Complete summary');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const renderSummary = ({ item }: { item: Summary }) => (
    <View style={styles.summaryCard}>
      <TouchableOpacity
        style={styles.summaryContent}
        onPress={() => handleSummaryPress(item)}
      >
        <Text style={styles.summaryTitle}>{item.title}</Text>
        <Text style={styles.summaryText} numberOfLines={3}>
          {item.content}
        </Text>
        <Text style={styles.summaryDate}>
          {new Date(item.createdAt).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </TouchableOpacity>

      {/* Quick Copy Button */}
      <TouchableOpacity
        style={styles.copyButton}
        onPress={() => handleQuickCopy(item)}
      >
        <Text style={styles.copyButtonText}>📋</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summaries</Text>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={summaries}
          renderItem={renderSummary}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refreshSummaries} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No summaries yet. Record some speech to get started!
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryContent: {
    flex: 1,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 8,
  },
  summaryDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  copyButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
  },
  copyButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
});