import React from 'react';
import { TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { styles } from './styles';

const WHISPER_MODELS = [
  { label: 'Whisper Large V3 Turbo', value: 'whisper-large-v3-turbo' },
  { label: 'Distil Whisper Large V3 EN', value: 'distil-whisper-large-v3-en' },
  { label: 'Whisper Large V3', value: 'whisper-large-v3' },
];

interface WhisperModelDropdownProps {
  selectedModel: string;
  dropdownVisible: boolean;
  onToggleDropdown: () => void;
  onSelectModel: (modelValue: string) => void;
}

export const WhisperModelDropdown: React.FC<WhisperModelDropdownProps> = ({
  selectedModel,
  dropdownVisible,
  onToggleDropdown,
  onSelectModel,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getModelLabel = (value: string) => {
    return WHISPER_MODELS.find(model => model.value === value)?.label || value;
  };

  return (
    <View style={styles.settingContainer}>
      <Text style={[
        styles.settingLabel,
        isDark ? styles.darkSettingLabel : styles.lightSettingLabel
      ]}>
        Whisper Model
      </Text>
      <TouchableOpacity
        style={[
          styles.dropdown,
          isDark ? styles.darkDropdown : styles.lightDropdown
        ]}
        onPress={onToggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.dropdownText,
          isDark ? styles.darkDropdownText : styles.lightDropdownText
        ]}>
          {getModelLabel(selectedModel)}
        </Text>
        <Text style={[
          styles.dropdownArrow,
          isDark ? styles.darkDropdownArrow : styles.lightDropdownArrow
        ]}>
          {dropdownVisible ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[
          styles.dropdownMenu,
          isDark ? styles.darkDropdownMenu : styles.lightDropdownMenu
        ]}>
          {WHISPER_MODELS.map((model, index) => (
            <TouchableOpacity
              key={model.value}
              style={[
                styles.dropdownItem,
                isDark ? styles.darkDropdownItem : styles.lightDropdownItem,
                selectedModel === model.value && styles.selectedItem,
                index === WHISPER_MODELS.length - 1 && { borderBottomWidth: 0 }
              ]}
              onPress={() => onSelectModel(model.value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.dropdownItemText,
                isDark ? styles.darkDropdownItemText : styles.lightDropdownItemText,
                selectedModel === model.value && styles.selectedItemText
              ]}>
                {model.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};