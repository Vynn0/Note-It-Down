import { StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Text, View } from '@/components/Themed';
import useSummaries from '@/hooks/useSummaries';
import { Summary } from '@/services/summarizeService';

export default function TabOneScreen() {
  const { summaries, isLoading, error, refreshSummaries, deleteSummary } = useSummaries();

  const handleSummaryPress = (summary: Summary) => {
    Alert.alert(
      summary.title,
      summary.content,
      [
        {
          text: 'View Original',
          onPress: () => Alert.alert('Original Transcription', summary.originalText),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Summary',
              'Are you sure you want to delete this summary?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteSummary(summary.id) },
              ]
            );
          },
        },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const renderSummary = ({ item }: { item: Summary }) => (
    <TouchableOpacity style={styles.summaryCard} onPress={() => handleSummaryPress(item)}>
      <Text style={styles.summaryTitle}>{item.title}</Text>
      <Text style={styles.summaryContent} numberOfLines={3}>
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
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  summaryContent: {
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