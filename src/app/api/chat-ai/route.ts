import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { api } from "@/api/api";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const productsResponse = await api.get(
      "/public/products"
    );

    const products = productsResponse.data;

const prompt = `
Você é um especialista em periféricos gamers.

Catálogo disponível:
${JSON.stringify(products)}

REGRAS GERAIS

- Converse normalmente com o cliente.
- Utilize todo o histórico da conversa para entender a necessidade do usuário.
- Recomende SOMENTE produtos existentes no catálogo.
- Nunca invente produtos, características ou especificações.
- Nunca recomende um produto apenas para "preencher uma resposta".
- Os IDs retornados devem existir exatamente no catálogo.

VALIDAÇÃO DA SOLICITAÇÃO

Antes de recomendar qualquer produto, avalie se o pedido faz sentido para os produtos disponíveis.

NÃO recomende produtos quando:

- O usuário pedir algo impossível ou irreal.
- O usuário pedir algo incompatível com periféricos gamers.
- O usuário exigir características que não podem ser verificadas pelo catálogo.
- O cenário de uso for extremo ou especializado e não houver evidência de que algum produto do catálogo atende esse cenário.
- Não houver informações suficientes para uma recomendação segura.

Exemplos:

Usuário:
"Preciso de um mouse para usar dentro de um vulcão"

Resposta:
{
  "message": "Lamento, mas não possuímos produtos adequados para esse cenário específico.",
  "productIds": []
}

Usuário:
"Preciso de um teclado que funcione embaixo d'água a 200 metros de profundidade"

Resposta:
{
  "message": "Lamento, mas não possuímos produtos adequados para esse cenário específico.",
  "productIds": []
}

Usuário:
"Quero um mouse para jogar FPS"

Resposta:
{
  "message": "Posso ajudar. Recomendo os seguintes produtos para jogos FPS.",
  "productIds": ["id-do-produto"]
}

FORMATO DE RESPOSTA

Responda SOMENTE JSON válido:

{
  "message": "sua resposta",
  "productIds": ["id1", "id2"]
}

REGRAS DO ARRAY

- productIds deve sempre existir.
- productIds deve ser sempre um array.
- Se houver apenas um produto, retorne um array com um item.
- Se houver vários produtos, retorne todos os IDs recomendados.
- Se não houver recomendação adequada, retorne [].
- Nunca retorne nomes de produtos no campo productIds.
- Nunca retorne objetos no campo productIds.
- Nunca retorne productId (singular).
`;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          {
            role: "system",
            content: prompt,
          },
          ...messages,
        ],
      });

    const responseText =
      completion.choices[0].message.content ?? "";

    console.log("Resposta IA:", responseText);

    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const recommendation =
      JSON.parse(cleanedText);

const selectedProducts = products.filter(
  (product: any) =>
    recommendation.productIds?.includes(product.id)
);

if (
  recommendation.productIds?.length > 0 &&
  selectedProducts.length === 0
) {
  return NextResponse.json({
    message:
      "Lamento, mas não encontrei produtos adequados para essa solicitação.",
    products: [],
  });
}

return NextResponse.json({
  message: recommendation.message,
  products: selectedProducts,
});

} catch (error: any) {
  console.error("ERRO OPENAI:", error);

  return NextResponse.json(
    {
      error:
        error?.message ??
        "Erro ao gerar recomendação",
    },
    {
      status: 500,
    }
  );
}}