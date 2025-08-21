export default async function handler(request, response) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({
      error: { message: "A chave da API do Gemini não está configurada." },
    });
  }

  const model = "gemini-2.0-flash";
  const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const iaResponse = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Sua missão é gerar um elogio único e surpreendente para minha namorada. Aleatoriamente escolha um dos seguintes estilos: Use uma metáfora comparando-a com algo do universo (estrelas, galáxias). ou Descreva o efeito que o sorriso dela causa. ou Crie um elogio focado no olhar dela. ou Faça um elogio sobre a inteligência ou a risada dela. ou Faça um elogio sobre a força e a resiliência dela. ou Crie um elogio sobre a bondade e o coração generoso dela. ou Use uma metáfora sobre como a voz dela soa. Retorne APENAS a frase do elogio, com no máximo 20 palavras e sem qualquer introdução.",
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 60,
        },
      }),
    });

    const data = await iaResponse.json();

    const generatedText = data.candidates[0].content.parts[0].text.trim();
    response.status(200).json({ text: generatedText });
  } catch (error) {
    console.error("Erro ao chamar a API do Gemini:", error);
    response.status(500).json({
      error: { message: "Falha ao se comunicar com a IA." },
    });
  }
}
