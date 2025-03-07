export const sendMessage = async (input: string): Promise<string> => {
  const response = await fetch("/api/groq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `
          Você é um assistente virtual projetado para ajudar as pessoas a encontrar informações e 
          soluções para diversas questões. Seu objetivo é fornecer informações claras, precisas e 
          úteis sobre qualquer tema que o usuário desejar. Você é simpático, receptivo e sempre tenta 
          ajudar o usuário da melhor forma possível. Se o usuário perguntar sobre algo que você não 
          possa responder com precisão, informe que está aprendendo e redirecione a conversa para
          um tema que você possa ajudar.`
        },
        { role: "user", content: input },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao chamar a API");
  }

  const data = await response.json();
  return data.response || "Desculpe, não consegui processar sua mensagem.";
};