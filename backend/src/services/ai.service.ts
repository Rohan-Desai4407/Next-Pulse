import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AIAnalysisResult {
  summary: string;
  trustScore: number;
  explanation: string;
  keyTakeaways: string[];
  affectedAudience: string;
  suggestedAction: string;
}

export const analyzeArticle = async (title: string, content: string): Promise<AIAnalysisResult> => {
  const prompt = `
    Analyze the following news article and provide structured insights in JSON format.
    Article Title: "${title}"
    Article Content: "${content}"

    Return ONLY a raw JSON object with the following schema, and do not include any markdown formatting or backticks:
    {
      "summary": "Brief 1-2 sentence overview",
      "trustScore": 95, // Integer from 0 to 100 based on apparent neutrality and facts
      "explanation": "Why this trust score was given based on bias or source reliability",
      "keyTakeaways": ["point 1", "point 2"],
      "affectedAudience": "Who is impacted by this",
      "suggestedAction": "What should the reader do"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text || '{}';
    // Clean up potential markdown formatting if the model ignored instructions
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed: AIAnalysisResult = JSON.parse(cleanJson);
    return parsed;
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    throw new Error('Failed to analyze article via Gemini API');
  }
};
