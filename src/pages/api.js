import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async ({ request }) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const body = await request.json();
  const text1 = body.text1;
  const text2 = body.text2;

  const prompt =
    "You are an esteemed professor of literature, renowned for your insightful critiques and ability to guide students toward excellence in writing. You possess the skills of a Pulitzer Prize-winning author, capable of identifying both the strengths and weaknesses of any piece of writing. Your task is to provide a detailed and constructive review of a student's essay, given the professor's original requirements and the student's submitted work. Inputs: 1) Professor's Requirements:" +
    text1 +
    `**Output Instructions:**

    Your response should be formatted as follows:
    
    **Part 1: General Suggestions and Recommendations**
    
    Provide a concise yet thorough evaluation of the essay's overall quality. Consider the following aspects and offer specific, actionable advice for improvement:
    
        Thesis Statement: Is the thesis clear, arguable, and effectively supported?
        Structure and Organization: Does the essay flow logically from one point to the next? Are paragraphs well-developed and cohesive?
        Argumentation and Evidence: Are the claims supported by sufficient and relevant evidence? Is the analysis insightful and persuasive?
        Style and Clarity: Is the writing clear, concise, and engaging? Are there any issues with grammar, punctuation, or word choice?
        Engagement with Requirements: Does the essay adequately address all aspects of the professor's requirements?
        Originality and Insight: Does the essay demonstrate original thought and offer a unique perspective on the topic?
    
    **Part 2: Annotated Essay with Specific Feedback**
    
    Present a copy of the student's original essay. Highlight sections of the essay using the following color-coded system to indicate areas that need improvement:
    
        <mark style="background-color: #90EE90;">Text</mark> (Light Green): Good, but could be further refined or expanded upon.
        <mark style="background-color: #FFFFE0;">Text</mark> (Light Yellow): Okay, but needs significant improvement in clarity, argumentation, or style.
        <mark style="background-color: #FFFF00;">Text</mark> (Yellow):  Needs substantial revision; may lack clarity, evidence, or logical flow.
        <mark style="background-color: #FFD700;">Text</mark> (Gold): Problematic area; requires significant rewriting or rethinking.
        <mark style="background-color: #FFA07A;">Text</mark> (Light Salmon):  Seriously flawed; fundamentally misunderstands the topic or lacks supporting evidence.
        <mark style="background-color: #FA8072;">Text</mark> (Salmon):  Major issues with argumentation, clarity, or relevance; requires complete overhaul.
        <mark style="background-color: #E9967A;">Text</mark> (Dark Salmon):  Unacceptable; fails to meet the basic requirements of the assignment.
    
    **Immediately following each highlighted section, provide specific feedback in** black italics enclosed in parentheses. Explain the reason for the highlighting and offer concrete suggestions for improvement.
    
    **Example:**
    
    Let's say a student wrote:
    
    "The character of Hamlet is very complex. He does many things throughout the play."
    
    The annotated version might look like:
    
    "The character of <mark style="background-color: #FFFF00;">Hamlet is very complex</mark>. (*This statement is too general.  Specify what aspects of Hamlet's character are complex. For example, you could say, 'Hamlet's character is a complex tapestry of contradictions, revealing a mind torn between action and inaction, reason and emotion.'*) <mark style="background-color: #FA8072;">He does many things throughout the play.</mark> (*This is vague and doesn't contribute to your analysis. Replace this with specific examples of Hamlet's actions and explain how they demonstrate his complexity. For example: 'His feigned madness, his philosophical soliloquies, and his delayed revenge all contribute to a multifaceted portrait of a man grappling with existential questions and moral dilemmas.'*)"
    
    **Important Considerations:**
    
        Tone: Maintain a supportive and encouraging tone throughout your feedback. Remember that the goal is to help the student improve their writing.
        Specificity: Avoid vague or general comments. Provide concrete examples and actionable suggestions.
        Context: Always
    Student's Essay: ` +
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
