const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export interface Summary {
    id: string;
    title: string;
    content: string;
    originalText: string;
    createdAt: string;
}

export const summarizeText = async (text: string): Promise<Summary> => {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key not found');
    }

    const prompt = `Summarize the following text in Indonesian. For context, the text provided came from Speech to Text, so expect a lot of unclear jargons, and you must understand contexts. Provide a clear, concise summary that captures the main points. Also suggest a short title (max 5 words) for this content:

    Text to summarize:
    ${text}

    Please respond in this format:
    Title: [short title here]
    Summary: [summary here]`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`, {
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