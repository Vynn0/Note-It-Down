import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { Text, View } from '@/components/Themed';
import { 
  saveWhisperModel, 
  getWhisperModel, 
  saveGroqApiKey, 
  getGroqApiKey, 
  saveGeminiApiKey, 
  getGeminiApiKey,
  clearApiKey 
} from '@/services/storageService';
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
  const [groqApiKey, setGroqApiKey] = useState<string>('');
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [isUsingDefaultGroq, setIsUsingDefaultGroq] = useState<boolean>(false);
  const [isUsingDefaultGemini, setIsUsingDefaultGemini] = useState<boolean>(false);

  useEffect(() => {
    loadSelectedModel();
    checkFirebase();
    loadApiKeys();
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

  const loadApiKeys = async () => {
    try {
      const groqKey = await getGroqApiKey();
      const geminiKey = await getGeminiApiKey();
      
      // Check if using default (from env) or custom API keys
      const defaultGroqKey = process.env.EXPO_PUBLIC_GROQ_API_KEY || '';
      const defaultGeminiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
      
      setIsUsingDefaultGroq(groqKey === defaultGroqKey);
      setIsUsingDefaultGemini(geminiKey === defaultGeminiKey);
      
      if (!isUsingDefaultGroq) {
        setGroqApiKey(groqKey);
      }
      if (!isUsingDefaultGemini) {
        setGeminiApiKey(geminiKey);
      }
    } catch (error) {
      console.error('Failed to load API keys:', error);
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

  const handleSaveGroqApiKey = async () => {
    try {
      if (groqApiKey.trim()) {
        await saveGroqApiKey(groqApiKey.trim());
        setIsUsingDefaultGroq(false);
        Alert.alert('Success', 'Groq API key saved successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save Groq API key');
    }
  };

  const handleSaveGeminiApiKey = async () => {
    try {
      if (geminiApiKey.trim()) {
        await saveGeminiApiKey(geminiApiKey.trim());
        setIsUsingDefaultGemini(false);
        Alert.alert('Success', 'Gemini API key saved successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save Gemini API key');
    }
  };

  const handleClearGroqApiKey = async () => {
    try {
      await clearApiKey('groq');
      setGroqApiKey('');
      setIsUsingDefaultGroq(true);
      Alert.alert('Success', 'Groq API key cleared. Using default key.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear Groq API key');
    }
  };

  const handleClearGeminiApiKey = async () => {
    try {
      await clearApiKey('gemini');
      setGeminiApiKey('');
      setIsUsingDefaultGemini(true);
      Alert.alert('Success', 'Gemini API key cleared. Using default key.');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear Gemini API key');
    }
  };

  const getModelLabel = (value: string) => {
    return WHISPER_MODELS.find(model => model.value === value)?.label || value;
  };

  return (
    <ScrollView style={styles.scrollContainer}>
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

        {/* Groq API Key Section */}
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>
            Groq API Key {isUsingDefaultGroq ? '(Using Default - REQUIRED)' : '(Custom - REQUIRED)'}:
          </Text>
          <TextInput
            style={styles.textInput}
            value={groqApiKey}
            onChangeText={setGroqApiKey}
            placeholder="Enter your Groq API key (leave empty to use default)"
            placeholderTextColor="#999"
            secureTextEntry={true}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveGroqApiKey}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearGroqApiKey}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Gemini API Key Section */}
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>
            Gemini API Key {isUsingDefaultGemini ? '(Using Default - REQUIRED)' : '(Custom - REQUIRED)'}:
          </Text>
          <TextInput
            style={styles.textInput}
            value={geminiApiKey}
            onChangeText={setGeminiApiKey}
            placeholder="Enter your Gemini API key (leave empty to use default)"
            placeholderTextColor="#999"
            secureTextEntry={true}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveGeminiApiKey}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearGeminiApiKey}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
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
  // API Key styles
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    color: 'black',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});