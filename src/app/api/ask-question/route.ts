import admin from "firebase-admin";
import { adminDb } from "../../../../firebaseAdmin";
import { queryChatGpt } from "@/helpers/queryApi";
import { Message } from "../../../../typings";

export async function POST(req: Request, res: Response) {
  // req.body gives a readable stream
  const { prompt, chatId, model, session } = await req.json();

  const response = await queryChatGpt(prompt, model);
  const message: Message = {
    text: response,
    user: {
      _id: chatId,
      name: "ChatGPT",
      avatar: "/avatar-logo.png",
    },
    createdAt: admin.firestore.Timestamp.now(),
  };

  try {
    await adminDb
      .collection("users")
      .doc(session?.user?.email)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);
  } catch (error) {
    return Response.json(
      {
        answer: error.message,
      },
      {
        status: 500,
      }
    );
  }

  return Response.json(
    {
      answer: message.text,
    },
    {
      status: 200,
    }
  );
}
