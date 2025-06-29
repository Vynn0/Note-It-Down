import React from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput, useColorScheme } from 'react-native';
import { styles } from './styles';

interface AdvancedSettingsProps {
  showAdvanced: boolean;
  useCustomPrompt: boolean;
  customPrompt: string;
  temperature: string;
  topK: string;
  topP: string;
  maxOutputTokens: string;
  onToggleAdvanced: () => void;
  onToggleCustomPrompt: (value: boolean) => void;
  onChangePrompt: (text: string) => void;
  onChangeTemperature: (text: string) => void;
  onChangeTopK: (text: string) => void;
  onChangeTopP: (text: string) => void;
  onChangeMaxTokens: (text: string) => void;
  onSave: () => void;
  onReset: () => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  showAdvanced,
  useCustomPrompt,
  customPrompt,
  temperature,
  topK,
  topP,
  maxOutputTokens,
  onToggleAdvanced,
  onToggleCustomPrompt,
  onChangePrompt,
  onChangeTemperature,
  onChangeTopK,
  onChangeTopP,
  onChangeMaxTokens,
  onSave,
  onReset,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const placeholderColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  return (
    <View style={styles.settingContainer}>
      <TouchableOpacity 
        style={[
          styles.toggleContainer,
          isDark ? styles.darkToggleContainer : styles.lightToggleContainer
        ]}
        onPress={onToggleAdvanced}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.settingLabel,
          isDark ? styles.darkSettingLabel : styles.lightSettingLabel
        ]}>
          Advanced Gemini Settings
        </Text>
        <Text style={[
          styles.dropdownArrow,
          isDark ? styles.darkDropdownArrow : styles.lightDropdownArrow
        ]}>
          {showAdvanced ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showAdvanced && (
        <View style={[
          styles.advancedSection,
          isDark ? styles.darkAdvancedSection : styles.lightAdvancedSection
        ]}>
          {/* Custom Prompt Toggle */}
          <View style={styles.switchContainer}>
            <Text style={[
              styles.switchLabel,
              isDark ? styles.darkSwitchLabel : styles.lightSwitchLabel
            ]}>
              Use Custom Prompt
            </Text>
            <Switch
              value={useCustomPrompt}
              onValueChange={onToggleCustomPrompt}
              trackColor={{ false: isDark ? 'rgba(255,255,255,0.2)' : '#ccc', true: '#007AFF' }}
              thumbColor={useCustomPrompt ? '#fff' : '#f4f3f4'}
              ios_backgroundColor={isDark ? 'rgba(255,255,255,0.2)' : '#ccc'}
            />
          </View>

          {/* Custom Prompt Editor */}
          {useCustomPrompt && (
            <View style={styles.inputContainer}>
              <Text style={[
                styles.inputLabel,
                isDark ? styles.darkInputLabel : styles.lightInputLabel
              ]}>
                Custom Prompt
              </Text>
              <Text style={[
                styles.helperText,
                isDark ? styles.darkHelperText : styles.lightHelperText
              ]}>
                Use {'{TEXT_PLACEHOLDER}'} where you want the transcribed text to be inserted
              </Text>
              <TextInput
                style={[
                  styles.textAreaInput,
                  isDark ? styles.darkTextAreaInput : styles.lightTextAreaInput
                ]}
                value={customPrompt}
                onChangeText={onChangePrompt}
                placeholder="Enter your custom prompt..."
                placeholderTextColor={placeholderColor}
                multiline={true}
                numberOfLines={8}
                textAlignVertical="top"
              />
            </View>
          )}

          {/* Parameter Controls */}
          <ParameterInput
            label="Temperature"
            helperText="Controls randomness (0.0 - 2.0). Lower = focused, Higher = creative"
            value={temperature}
            onChangeText={onChangeTemperature}
            placeholder="0.7"
            keyboardType="decimal-pad"
            isDark={isDark}
            placeholderColor={placeholderColor}
          />

          <ParameterInput
            label="Top K"
            helperText="Limits vocabulary to top K tokens (1 or higher)"
            value={topK}
            onChangeText={onChangeTopK}
            placeholder="1"
            keyboardType="number-pad"
            isDark={isDark}
            placeholderColor={placeholderColor}
          />

          <ParameterInput
            label="Top P"
            helperText="Nucleus sampling threshold (0.0 - 1.0)"
            value={topP}
            onChangeText={onChangeTopP}
            placeholder="1"
            keyboardType="decimal-pad"
            isDark={isDark}
            placeholderColor={placeholderColor}
          />

          <ParameterInput
            label="Max Output Tokens"
            helperText="Maximum length of generated response"
            value={maxOutputTokens}
            onChangeText={onChangeMaxTokens}
            placeholder="4096"
            keyboardType="number-pad"
            isDark={isDark}
            placeholderColor={placeholderColor}
          />

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={onSave}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Save Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={onReset}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Reset to Default</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

interface ParameterInputProps {
  label: string;
  helperText: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType: 'decimal-pad' | 'number-pad';
  isDark: boolean;
  placeholderColor: string;
}

const ParameterInput: React.FC<ParameterInputProps> = ({
  label,
  helperText,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  isDark,
  placeholderColor,
}) => (
  <View style={styles.inputContainer}>
    <Text style={[
      styles.inputLabel,
      isDark ? styles.darkInputLabel : styles.lightInputLabel
    ]}>
      {label}
    </Text>
    <Text style={[
      styles.helperText,
      isDark ? styles.darkHelperText : styles.lightHelperText
    ]}>
      {helperText}
    </Text>
    <TextInput
      style={[
        styles.smallTextInput,
        isDark ? styles.darkSmallTextInput : styles.lightSmallTextInput
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      keyboardType={keyboardType}
    />
  </View>
);