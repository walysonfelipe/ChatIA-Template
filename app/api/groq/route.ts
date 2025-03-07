import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic"; // Permite comportamento dinâmico ou estático, dependendo do código

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: Message[];
}

export async function POST(request: Request) {
  // Verifica se o método é POST
  if (request.method !== "POST") {
    return NextResponse.json({ message: "Método não permitido" }, { status: 405 });
  }

  // Extrai o corpo da requisição
  const body: RequestBody = await request.json();
  const { messages } = body;

  // Validação do corpo da requisição
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ message: "Corpo da requisição inválido" }, { status: 400 });
  }

  try {
    // Chama a API do Groq
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "Desculpe, não consegui processar sua mensagem.";
    return NextResponse.json({ response: responseContent }, { status: 200 });
  } catch (error) {
    console.error("Erro ao chamar o Groq SDK:", error);
    return NextResponse.json(
      { message: "Erro ao processar a requisição", error: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  } 
}