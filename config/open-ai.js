import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is loaded correctly
});

const openai = new OpenAIApi(configuration);

export default openai;