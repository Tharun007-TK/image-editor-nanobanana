
import { GoogleGenAI, Modality } from '@google/genai';

// Assume process.env.API_KEY is available
if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this environment, we assume it's set.
    console.warn("API_KEY environment variable not set. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const base64ToGenerativePart = (data: string, mimeType: string) => {
    return {
        inlineData: {
            data: data.split(',')[1],
            mimeType
        },
    };
};

export async function editImage(base64ImageData: string, mimeType: string, prompt: string): Promise<string> {
    try {
        const imagePart = base64ToGenerativePart(base64ImageData, mimeType);
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [imagePart, textPart]
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];

        if (firstPart && firstPart.inlineData) {
            const base64ImageBytes = firstPart.inlineData.data;
            const imageMimeType = firstPart.inlineData.mimeType;
            return `data:${imageMimeType};base64,${base64ImageBytes}`;
        } else {
            throw new Error('No image was generated. The model may have returned a safety block or an empty response.');
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error('Failed to generate image. Please check your prompt or the console for more details.');
    }
}
