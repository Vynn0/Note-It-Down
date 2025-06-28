import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { Text, View } from '@/components/Themed';
import { saveWhisperModel, getWhisperModel } from '@/services/storageService';
import { testConnection } from '@/firebase/firebaseConfig';

const WHISPER_MODELS = [
  { label: 'Whisper Large V3 Turbo', value: 'whisper-large-v3-turbo' },
  { label: 'Distil Whisper Large V3 EN', value: 'distil-whisper-large-v3-en' },
  { label: 'Whisper Large V3', value: 'whisper-large-v3' },
];

export default function ModalScreen() {
  const [selectedModel, setSelectedModel] = useState<string>('whisper-large-v3');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Checking...');

  useEffect(() => {
    loadSelectedModel();
    checkFirebase();
  }, []);

  const checkFirebase = () => {
    const status = testConnection();
    setFirebaseStatus(status);
  };

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

      {/* Firebase Status */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Firebase: {firebaseStatus}</Text>
      </View>

      {/* Whisper Model Section */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Whisper Model:</Text>

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

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto' } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  settingContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  // Dropdown styles
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    maxHeight: 200,
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