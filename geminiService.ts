import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client securely via env variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthArticle = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional, short, and highly informative health article about: ${topic}. 
      Include sections for "Clinical Overview", "Preventative Actions", and "Professional Consultation Guidance". 
      Format with clean headers and professional medical tone. 
      Do not mention the name of the AI model or service provider.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating health article:", error);
    return "Unable to load article content at this time. Our medical database is temporarily offline.";
  }
};

export const analyzeSymptoms = async (symptoms: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a clinical-grade analysis of these reported symptoms: "${symptoms}". 
      Return a precise JSON object with:
      1. analysis: Detailed biological overview and potential pathways.
      2. suggestions: 4 specific, safe self-care or preparation steps.
      3. disclaimer: Mandatory medical warning.
      Focus on evidence-based health data.
      Do not mention the name of the AI model, 'Gemini', or service provider.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            disclaimer: { type: Type.STRING }
          },
          required: ["analysis", "suggestions", "disclaimer"]
        },
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw error;
  }
};

export const getDailyHealthSuggestions = async () => {
  try {
    const dateStr = new Date().toDateString();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 10 high-impact daily health micro-milestones for today (${dateStr}). 
      Focus on metabolic health, cognitive clarity, and physical longevity. 
      Return as a JSON array of 10 strings.
      Do not mention any AI branding or model names.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["suggestions"]
        }
      }
    });
    const text = response.text;
    return text ? JSON.parse(text).suggestions : [];
  } catch (error) {
    console.error("Error fetching daily suggestions:", error);
    return [];
  }
};