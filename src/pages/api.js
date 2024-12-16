import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async ({ request }) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const body = await request.json();
  const text1 = body.text1;
  const text2 = body.text2;

  const prompt =
    "What follows is a list of the requirements for an Essay that I have written: '" +
    text1 +
    `Please give advice on what to improve in the following essay to meet these criteria, most importantly, how adequately is the claim being supported. 
    DO NOT send a revised essay: only send what should be changed.
    Your response should contain 2 parts. The first part should be general suggestions and recommendations.
    The second part should be a copy of the original essay with the parts that should be improved highlighted.
    Each part of the original essay that should be improved should be highlighted with a different color, followed by recommendations
    for that part, which should be in black italics and inside parantheses. DO NOT put any part of the original essay into parantheses. Each colored part of the essay should be immediately followed by a recommendation for that part. Highlighted parts and recommendations should alternate. The recommendation itself should not be highlighted with a color, but it should be inside parantheses. Only the original
    parts of the essay that need to be improved should be highlighted with a color. Only set the background color of the parts of the original essay that need to be improved, but DO  NOT change the color of the text itself, which should be black. The color of the recommedations and suggestions MUST be black.
    Here is the essay: ` +
    text2;

  const result = await model.generateContent(prompt);
  //console.log(result.response.text());
  return new Response(
    JSON.stringify({
      //message: "Your submissions were: " + text1 + " and " + text2,
      message: result.response.text(),
    })
  );
};
