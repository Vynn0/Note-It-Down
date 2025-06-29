const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    // Additional colors for consistency
    card: '#f8f9fa',
    border: '#e9ecef',
    notification: '#ff3b30',
    inputBackground: '#f8f9fa',
    inputBorder: '#e9ecef',
    inputText: '#212529',
    dropdownBackground: '#f8f9fa',
    dropdownText: '#212529',
    dropdownBorder: '#e9ecef',
    primaryButton: '#007AFF',
    dangerButton: '#FF3B30',
    switchTrackTrue: '#007AFF',
    switchTrackFalse: '#ccc',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    // Additional colors for consistency
    card: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    notification: '#ff3b30',
    inputBackground: 'rgba(255, 255, 255, 0.05)',
    inputBorder: 'rgba(255, 255, 255, 0.1)',
    inputText: '#ffffff',
    dropdownBackground: 'rgba(28, 28, 30, 0.95)',
    dropdownText: '#ffffff',
    dropdownBorder: 'rgba(255, 255, 255, 0.1)',
    primaryButton: '#007AFF',
    dangerButton: '#FF3B30',
    switchTrackTrue: '#007AFF',
    switchTrackFalse: 'rgba(255, 255, 255, 0.2)',
  },
};