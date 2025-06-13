import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import { getWhisperModel, saveWhisperModel } from '@/services/storageService';

const WHISPER_MODELS = [
  { label: 'Whisper Large V3 Turbo', value: 'whisper-large-v3-turbo' },
  { label: 'Distil Whisper Large V3 EN', value: 'distil-whisper-large-v3-en' },
  { label: 'Whisper Large V3', value: 'whisper-large-v3' },
];

export default function ModalScreen() {
  const [selectedModel, setSelectedModel] = useState<string>('whisper-large-v3');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    loadSelectedModel();
  }, []);

  const loadSelectedModel = async () => {
    try {
      const model = await getWhisperModel();
      setSelectedModel(model);
    } catch (error) {
      console.error('Failed to load selected model:', error);
    }
  };

  const handleModelSelect = async (modelValue: string) => {
    try {
      await saveWhisperModel(modelValue);
      setSelectedModel(modelValue);
      setDropdownVisible(false);
      Alert.alert('Success', 'Whisper model updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save model selection');
    }
  };

  const getModelLabel = (value: string) => {
    return WHISPER_MODELS.find(model => model.value === value)?.label || value;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Whisper Model:</Text>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.dropdownText}>{getModelLabel(selectedModel)}</Text>
            <Text style={styles.dropdownArrow}>{dropdownVisible ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              {WHISPER_MODELS.map((model) => (
                <TouchableOpacity
                  key={model.value}
                  style={[
                    styles.dropdownItem,
                    selectedModel === model.value && styles.selectedItem
                  ]}
                  onPress={() => handleModelSelect(model.value)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedModel === model.value && styles.selectedItemText
                  ]}>
                    {model.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  settingContainer: {
    width: '100%',
    maxWidth: 300,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dropdownText: {
    fontSize: 14,
    flex: 1,
    color: 'black',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  dropdownItemText: {
    fontSize: 14,
    color: 'black',
  },
  selectedItemText: {
    fontWeight: '600',
    color: '#1976d2',
  },
});