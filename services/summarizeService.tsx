import { getGeminiApiKey } from './storageService';

export interface Summary {
    id: string;
    title: string;
    content: string;
    originalText: string;
    createdAt: string;
}

export const summarizeText = async (text: string): Promise<Summary> => {
    const geminiApiKey = await getGeminiApiKey();
    
    if (!geminiApiKey) {
        throw new Error('Gemini API key not found. Please set your API key in Settings.');
    }

    const prompt = `You are analyzing a speech-to-text transcription that may contain inaccuracies. Please create a comprehensive summary in Indonesian.

    CONTEXT AWARENESS:
    - This text comes from audio recording converted to text
    - Speech recognition may have misheard words, especially technical terms and proper nouns
    - Multiple speakers may be present (meetings, discussions, lectures)
    - Some words may be incomplete, phonetically similar, or contextually incorrect
    - Focus on understanding the overall meaning and main themes rather than individual word accuracy

    ANALYSIS INSTRUCTIONS:
    1. Identify the main topics and key points being discussed
    2. Infer the correct meaning when words seem misheard (e.g., technical jargon, names, concepts)
    3. If multiple speakers are detected, try to distinguish different viewpoints or contributions
    4. Focus on the broader context and logical flow of ideas
    5. Ignore filler words, incomplete sentences, and obvious transcription errors

    Text to analyze:
    ${text}

    Please provide your analysis in this exact format:
    Title: [concise title, max 5 words, capturing the main topic]
    Summary: [comprehensive summary in Indonesian that captures the essence and main points of the discussion, focusing on the overall context rather than exact wording]`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 4096,
                },
                safetySettings: []
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // Check if response has the expected structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error('Invalid response structure from Gemini API');
        }

        const generatedText = data.candidates[0].content.parts[0].text;

        // Parse the response to extract title and summary
        const titleMatch = generatedText.match(/Title:\s*(.*)/);
        const summaryMatch = generatedText.match(/Summary:\s*([\s\S]*)/);

        const title = titleMatch ? titleMatch[1].trim() : 'Untitled Summary';
        const summary = summaryMatch ? summaryMatch[1].trim() : generatedText;

        return {
            id: Date.now().toString(),
            title,
            content: summary,
            originalText: text,
            createdAt: new Date().toISOString(),
        };
    } catch (error: any) {
        throw new Error(`Failed to summarize: ${error.message}`);
    }
};