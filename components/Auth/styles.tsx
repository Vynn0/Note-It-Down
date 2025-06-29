import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    opacity: 0.7,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 50,
  },
  loginButton: {
    backgroundColor: '#007AFF', // iOS blue - works well in both themes
    padding: 16,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  infoText: {
    marginTop: 24,
    textAlign: 'center',
    opacity: 0.6,
    fontSize: 13,
    fontStyle: 'italic',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  profileContainer: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  profileEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 24,
    padding: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  profileInfoLabel: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    opacity: 0.7,
  },
  profileInfoValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    opacity: 0.9,
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // iOS red
    padding: 16,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
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
  // Theme-specific styles
  lightProfileContainer: {
    backgroundColor: '#F8F9FA',
  },
  darkProfileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  lightTextInput: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E9ECEF',
    color: '#212529',
  },
  darkTextInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
  },
  lightProfileEmail: {
    backgroundColor: '#E3F2FD',
  },
  darkProfileEmail: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  lightProfileInfoBorder: {
    borderBottomColor: '#E9ECEF',
  },
  darkProfileInfoBorder: {
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
});