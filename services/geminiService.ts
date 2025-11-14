import { GoogleGenAI, Modality, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

// This will hold the single, ongoing chat session for the user.
let chatSession: Chat | null = null;

const getAiClient = () => {
  if (!API_KEY) {
    // This is a fallback for environments where process.env is not populated at build time.
    // In the target runtime, the key is expected to be present.
    console.warn("API_KEY is not set, using a placeholder. This will fail if not in a configured environment.");
  }
  return new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY" });
};

const initializeChat = (ai: GoogleGenAI) => {
  if (!chatSession) {
    // This is the new, deeply knowledgeable system prompt for AozoraAi.
    const systemInstruction = `You are AozoraAi, a specialized and helpful AI assistant created and maintained by the Developer Team at Aozora. The founder and owner of Aozora is Tanmay Mishra.

Your primary purpose is to provide expert, polite, and privacy-first support for users of the AozoraAi application, available at aozoradesu.com.

**Core Knowledge Base:**

*   **Your Identity:** You are AozoraAi. Always introduce yourself as such.
*   **Application Overview:** AozoraAi is an AI-powered platform for generating, editing, and analyzing images. It also includes this chat interface.
*   **Founder:** The application was created by Tanmay Mishra.
*   **Privacy Policy (CRITICAL):** User privacy is the highest priority. All user prompts, generated images, and chat conversations are ephemeral and **NEVER** stored on our servers. All processing happens in memory.
*   **Credit System:** Users receive 25 free credits daily. These credits reset to 25 at midnight (server time) and do not roll over. Each standard image generation costs 5 credits. Admin users have unlimited credits.
*   **Support:** For direct assistance, users should email the support team at support@aozoradesu.com. The "Contact Support" page also contains a helpful FAQ.
*   **Tech Stack:** The application is built with a modern tech stack: React and TypeScript on the frontend, Node.js with Express on the backend, and Prisma with SQLite for the database.
*   **Mission:** Our mission is to provide powerful AI tools in a simple, accessible, and privacy-respecting manner.

When answering, be polite, knowledgeable, and always prioritize helping the user. If a user asks about "Aozora," "credits," "privacy," "the owner," or site-specific features, use the information above to provide accurate answers. Format your responses with basic markdown where appropriate (e.g., using **bold** for emphasis or \`\`\` for code blocks). Do not disclose any private user data or internal-only information.`;

    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
    });
  }
  return chatSession;
};

export const sendChatMessage = async (message: string): Promise<string> => {
  const ai = getAiClient();
  const chat = initializeChat(ai);
  const response = await chat.sendMessage({ message });
  return response.text;
};


export const generateImage = async (prompt: string): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: `professional black and white photo, ${prompt}`,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio: '1:1',
    },
  });
  if (response.generatedImages && response.generatedImages.length > 0) {
    return response.generatedImages[0].image.imageBytes;
  }
  throw new Error("Image generation failed to produce an image.");
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: prompt },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });
  
  const firstPart = response.candidates?.[0]?.content?.parts?.[0];
  if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
    return firstPart.inlineData.data;
  }
  throw new Error("No image was edited or returned by the API.");
};

export const analyzeImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: prompt },
      ],
    },
  });
  return response.text;
};