import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView } from 'react-native';
import React from 'react';

import { Text, View } from '@/components/Themed';
import { useSettings } from '@/hooks/useSettings';
import { useFirebase } from '@/hooks/useFirebase';
import { WhisperModelDropdown } from '@/components/Settings/Dropdown';
import { ApiKeySection } from '@/components/Settings/APISection';
import { AdvancedSettings } from '@/components/Settings/AdvancedSettings';
import { styles } from '@/components/Settings/styles';

export default function ModalScreen() {
  const { firebaseStatus } = useFirebase();
  const {
    state,
    updateState,
    handleModelSelect,
    handleSaveGroqApiKey,
    handleSaveGeminiApiKey,
    handleClearGroqApiKey,
    handleClearGeminiApiKey,
    handleSaveGeminiSettings,
    handleResetGeminiSettings,
  } = useSettings();

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
        <WhisperModelDropdown
          selectedModel={state.selectedModel}
          dropdownVisible={state.dropdownVisible}
          onToggleDropdown={() => updateState({ dropdownVisible: !state.dropdownVisible })}
          onSelectModel={handleModelSelect}
        />

        {/* Groq API Key Section */}
        <ApiKeySection
          title="Groq API Key"
          apiKey={state.groqApiKey}
          isUsingDefault={state.isUsingDefaultGroq}
          placeholder="Enter your Groq API key (leave empty to use default)"
          onChangeText={(text) => updateState({ groqApiKey: text })}
          onSave={handleSaveGroqApiKey}
          onClear={handleClearGroqApiKey}
        />

        {/* Gemini API Key Section */}
        <ApiKeySection
          title="Gemini API Key"
          apiKey={state.geminiApiKey}
          isUsingDefault={state.isUsingDefaultGemini}
          placeholder="Enter your Gemini API key (leave empty to use default)"
          onChangeText={(text) => updateState({ geminiApiKey: text })}
          onSave={handleSaveGeminiApiKey}
          onClear={handleClearGeminiApiKey}
        />

        {/* Advanced Gemini Settings */}
        <AdvancedSettings
          showAdvanced={state.showAdvancedSettings}
          useCustomPrompt={state.useCustomPrompt}
          customPrompt={state.customPrompt}
          temperature={state.temperature}
          topK={state.topK}
          topP={state.topP}
          maxOutputTokens={state.maxOutputTokens}
          onToggleAdvanced={() => updateState({ showAdvancedSettings: !state.showAdvancedSettings })}
          onToggleCustomPrompt={(value) => updateState({ useCustomPrompt: value })}
          onChangePrompt={(text) => updateState({ customPrompt: text })}
          onChangeTemperature={(text) => updateState({ temperature: text })}
          onChangeTopK={(text) => updateState({ topK: text })}
          onChangeTopP={(text) => updateState({ topP: text })}
          onChangeMaxTokens={(text) => updateState({ maxOutputTokens: text })}
          onSave={handleSaveGeminiSettings}
          onReset={handleResetGeminiSettings}
        />

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </ScrollView>
  );
}