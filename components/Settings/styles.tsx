import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  settingContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  // Modern Dropdown styles
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '500',
  },
  selectedItemText: {
    fontWeight: '600',
    color: '#007AFF',
  },
  
  // Modern Input styles
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Button styles
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  
  // Advanced Settings Styles
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  advancedSection: {
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 4,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 13,
    marginBottom: 10,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  textAreaInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    minHeight: 120,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  smallTextInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    width: 120,
    textAlign: 'center',
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  // Light Mode Styles
  lightSettingLabel: {
    color: '#212529',
  },
  lightDropdown: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E9ECEF',
  },
  lightDropdownText: {
    color: '#212529',
  },
  lightDropdownArrow: {
    color: '#6C757D',
  },
  lightDropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E9ECEF',
  },
  lightDropdownItem: {
    borderBottomColor: '#F1F3F4',
  },
  lightDropdownItemText: {
    color: '#212529',
  },
  lightTextInput: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E9ECEF',
    color: '#212529',
  },
  lightToggleContainer: {
    backgroundColor: '#F8F9FA',
  },
  lightAdvancedSection: {
    backgroundColor: '#FFFFFF',
  },
  lightSwitchLabel: {
    color: '#212529',
  },
  lightInputLabel: {
    color: '#212529',
  },
  lightHelperText: {
    color: '#6C757D',
  },
  lightTextAreaInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E9ECEF',
    color: '#212529',
  },
  lightSmallTextInput: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E9ECEF',
    color: '#212529',
  },

  // Dark Mode Styles
  darkSettingLabel: {
    color: '#FFFFFF',
  },
  darkDropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  darkDropdownText: {
    color: '#FFFFFF',
  },
  darkDropdownArrow: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  darkDropdownMenu: {
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  darkDropdownItem: {
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  darkDropdownItemText: {
    color: '#FFFFFF',
  },
  darkTextInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
  },
  darkToggleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  darkAdvancedSection: {
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
  },
  darkSwitchLabel: {
    color: '#FFFFFF',
  },
  darkInputLabel: {
    color: '#FFFFFF',
  },
  darkHelperText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  darkTextAreaInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
  },
  darkSmallTextInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
  },
});