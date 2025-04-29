import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest", // Using the latest model that works with React Native
});

// Configuration for the model
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192, // Reduced for mobile compatibility
  responseMimeType: "application/json",
};

// Predefined chat history
const chatHistory = [
  {
    role: "user",
    parts: [
      {
        text: "Generate travel plan for location: New York, for one day and one night for family with a luxury budget with the flight details, flight pricing with booking url, hotel option with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions, and places to visit nearby with place name, place details, place image url, geo coordinates, ticket pricing, time travel each of location for one day and one night for each day plan with best time visit in JSON format"
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "Here's a luxury travel plan for New York... [truncated for brevity]"
      },
    ],
  },
];

// Function to start a chat session
export const startChatSession = async () => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory,
    });
    return chatSession;
  } catch (error) {
    console.error("Error starting chat session:", error);
    throw error;
  }
};

// Function to send a message and get a response
export const sendMessage = async (message) => {
  try {
    const chatSession = await startChatSession();
    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Example usage:
// const response = await sendMessage("Create a similar plan for Paris");
// console.log(response);           add code such that the ai model will always generate the trip in same format by taking reference from history