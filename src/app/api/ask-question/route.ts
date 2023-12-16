import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt, chatId, model, session } = req.body;
}
