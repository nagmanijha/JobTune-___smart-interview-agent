import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, role, level, techstack, amount, userId } = body;

    console.log("📥 Incoming request body:", body);

    const prompt = `You are a helpful assistant generating job interview questions.
Return exactly ${amount} questions in a **valid JSON array** format like:
["Question 1", "Question 2", "Question 3"]

Only output the array. No markdown, explanations, or extra text.

Details:
- Role: ${role}
- Experience Level: ${level}
- Tech Stack: ${techstack}
- Focus: ${type} (technical vs behavioral)`;

    const { text: questionsRaw } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt,
    });

    console.log("🧠 Raw AI output:\n", questionsRaw);

    // Extract valid JSON array from response
    const startIndex = questionsRaw.indexOf("[");
    const endIndex = questionsRaw.lastIndexOf("]") + 1;

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Could not find a JSON array in AI output.");
    }

    const jsonFragment = questionsRaw.slice(startIndex, endIndex).trim();

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(jsonFragment);
    } catch (err) {
      throw new Error("Failed to parse extracted JSON array.");
    }

    if (!Array.isArray(parsedQuestions)) {
      throw new Error("Parsed questions are not an array.");
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    console.log("✅ Saving interview to Firestore:", interview);

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error in POST /api/vapi/generate:", error);
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}


export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
