import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.GPT_KEY,
});

export default openAi;
