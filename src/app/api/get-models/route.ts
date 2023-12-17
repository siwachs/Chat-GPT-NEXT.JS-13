import openAi from "@/helpers/chatgpt";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

export async function GET(req: Request, res: Response) {
  const models = await openAi.models.list();

  return Response.json(
    {
      modelOptions: models.data.map((model) => ({
        value: model.id,
        label: model.id,
      })),
    },
    {
      status: 200,
    }
  );
}
