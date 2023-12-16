import openAi from "./chatgpt";

const queryChatGpt = async (prompt: string, chatId: string, model: string) => {
  return await openAi.chat.completions
    .create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9, // Randomness in result more temp means more creative.
      top_p: 1, // consider most proable tokens.
      max_tokens: 1000, // Max number of words in the result.
      frequency_penalty: 0, // Influence diversity in result.
      presence_penalty: 0,
    })
    .then((res) => res.choices[0].message)
    .catch(
      (error) =>
        `ChatGPT was unable to find answer for that! (Error: ${error.message})`
    );
};

export { queryChatGpt };
