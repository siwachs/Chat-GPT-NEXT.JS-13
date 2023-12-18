import openAi from "@/helpers/chatgpt";

type Option = {
  value: string;
  label: string;
};

export async function GET(req: Request, res: Response) {
  const models = await openAi.models.list();
  const modelOptions: Option[] = models.data.map((model: any) => ({
    label: model.id,
    value: model.id,
  }));

  return Response.json(
    {
      modelOptions,
    },
    {
      status: 200,
    }
  );
}
