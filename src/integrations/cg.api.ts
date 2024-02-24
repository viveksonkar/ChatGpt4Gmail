import axios, { AxiosResponse } from 'axios';
import { GLOBAL } from '../utils/global-data';

// Define the URL of the ChatGPT API endpoint
const apiUrl = 'https://api.openai.com/v1/chat/completions';

export interface CGResponse {
  choices: Array<ChatGptChoice>;
}
export interface ChatGptChoice {
  message: {
    content: string;
    role: string
  }
}

export const cgApi = async (system: string, user: string, 
  previousMessages: Array<string> = []): Promise<string> => {
  
  // Define the data to send in the request body
  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ],
    temperature: 0.7
  };

  // Define the request headers
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GLOBAL.cgApiKey}`
  };

  try {
    // Make the API request using Axios
    const response = await axios.post(apiUrl, requestData, { headers });
    console.log('Response from ChatGPT API:', response.data);
    const cgResponse = response.data as CGResponse;
    return cgResponse.choices[0].message.content; // Return the response data
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; // Throw the error to indicate failure
  }
};
