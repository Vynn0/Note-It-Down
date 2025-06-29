import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { styles } from './styles';

interface ApiKeySectionProps {
  title: string;
  apiKey: string;
  isUsingDefault: boolean;
  placeholder: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
  onClear: () => void;
}

export const ApiKeySection: React.FC<ApiKeySectionProps> = ({
  title,
  apiKey,
  isUsingDefault,
  placeholder,
  onChangeText,
  onSave,
  onClear,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const placeholderColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  return (
    <View style={styles.settingContainer}>
      <Text style={[
        styles.settingLabel,
        isDark ? styles.darkSettingLabel : styles.lightSettingLabel
      ]}>
        {title} {isUsingDefault ? '(Using Default)' : '(Custom)'}
      </Text>
      <Text style={[
        styles.helperText,
        isDark ? styles.darkHelperText : styles.lightHelperText,
        { marginBottom: 8 }
      ]}>
        {isUsingDefault ? 'Currently using the default API key' : 'Using your custom API key'}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          isDark ? styles.darkTextInput : styles.lightTextInput
        ]}
        value={apiKey}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={onSave}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Save Key</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={onClear}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Use Default</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};