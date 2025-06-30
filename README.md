# Note-It-Down 📝🎤

> AI-powered speech-to-text app that transforms your lectures and seminars into organized, summarized notes with just a single tap.

## What is Note-It-Down?

Note-It-Down is a mobile application designed specifically for students and professionals who want to capture and process spoken content efficiently. Whether you're in a lecture hall, attending a seminar, or participating in a meeting, this app helps you record, transcribe, and summarize audio content using cutting-edge AI technology.

### Key Features

- **🎙️ One-Tap Recording**: Start recording lectures, seminars, or meetings instantly with a single tap
- **🤖 AI-Powered Transcription**: Convert speech to text using Groq's Whisper technology for accurate transcription
- **📋 Intelligent Summarization**: Get AI-generated summaries of your recordings using Google's Gemini AI
- **⚙️ Customizable AI Settings**: Fine-tune your experience with adjustable Gemini parameters (temperature, topK)
- **💬 Custom Prompts**: Create personalized prompts to get summaries tailored to your specific needs
- **☁️ Cloud Sync**: Your notes are securely stored and synchronized across all your devices via Firebase
- **🔐 Secure Authentication**: Firebase authentication ensures your data remains private and accessible only to you

## How It Works

1. **Record**: Open the app and tap to start recording your lecture or seminar
2. **Transcribe**: The app uses Groq's Whisper model to convert your audio to text
3. **Summarize**: Gemini AI processes the transcription and creates a structured summary
4. **Save & Sync**: Your notes are automatically saved to Firebase and synced across your devices
5. **Review**: Access your organized notes anytime, anywhere

## Technology Stack

- **Frontend**: React Native with Expo
- **Speech-to-Text**: Groq (Whisper)
- **AI Summarization**: Google Gemini
- **Authentication & Database**: Firebase
- **Development**: TypeScript, Expo Go

## Screenshots

**Dashboard**

![image](https://github.com/user-attachments/assets/e311c118-abea-4dc1-b105-e054dd3a5396)

**Record**

![image](https://github.com/user-attachments/assets/1efb5d7d-fde0-4b39-b886-b83cd9e22987)

**Authentication**

![image](https://github.com/user-attachments/assets/48222535-08fb-4520-9a84-e0eac35792f3)

**Settings**

![image](https://github.com/user-attachments/assets/44fdc9e6-0255-4b7d-bc12-452a49afc096)

## Transcription Models

Choose the perfect Whisper model for your needs provided by Groq:

### 🚀 Whisper Large V3 Turbo
- **Language Support**: Multilingual
- **Best For**: Fast, accurate transcription in multiple languages
- **Description**: A fine-tuned version of a pruned Whisper Large V3 designed for fast, multilingual transcription tasks

### ⚡ Distil-Whisper English
- **Language Support**: English-only
- **Best For**: Fastest processing for English content
- **Description**: A distilled, compressed version of OpenAI's Whisper model, designed to provide faster, lower-cost English speech recognition while maintaining comparable accuracy

### 🎯 Whisper Large-v3
- **Language Support**: Multilingual
- **Best For**: Maximum accuracy for complex multilingual content
- **Description**: Provides state-of-the-art performance with high accuracy for multilingual transcription and translation tasks
