import { queryChatGpt } from "@/helpers/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    return res.status(404).json({
      answer: "No Prompt found.",
    });
  }

  if (!chatId) {
    return res.status(404).json({
      answer: "No ChatId found.",
    });
  }

  if (!model) {
    return res.status(404).json({
      answer: "No Model found.",
    });
  }

  if (!session) {
    return res.status(404).json({
      answer: "No session found.",
    });
  }

  const response = await queryChatGpt(prompt, chatId, model);
  const message: Message = {
    text: response,
    user,
    createdAt:
  };
}
