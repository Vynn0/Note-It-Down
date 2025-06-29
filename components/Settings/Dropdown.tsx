import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from '../Themed';
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
  const { colors, isDark } = useTheme();

  const getModelLabel = (value: string) => {
    return WHISPER_MODELS.find(model => model.value === value)?.label || value;
  };

  return (
    <View style={styles.settingContainer}>
      <Text style={[styles.settingLabel, { color: colors.text }]}>
        Whisper Model
      </Text>
      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
          }
        ]}
        onPress={onToggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={[styles.dropdownText, { color: colors.text }]}>
          {getModelLabel(selectedModel)}
        </Text>
        <Text style={[styles.dropdownArrow, { color: colors.text }]}>
          {dropdownVisible ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[
          styles.dropdownMenu,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          }
        ]}>
          {WHISPER_MODELS.map((model, index) => (
            <TouchableOpacity
              key={model.value}
              style={[
                styles.dropdownItem,
                { borderBottomColor: colors.border },
                selectedModel === model.value && { backgroundColor: colors.tint + '20' },
                index === WHISPER_MODELS.length - 1 && { borderBottomWidth: 0 }
              ]}
              onPress={() => onSelectModel(model.value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.dropdownItemText,
                { color: colors.text },
                selectedModel === model.value && { color: colors.tint, fontWeight: '600' }
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