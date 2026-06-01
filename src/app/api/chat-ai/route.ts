import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { api } from "@/api/api";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { objective, profile } = await req.json();

    const productsResponse = await api.get(
      "/public/products"
    );

    const products = productsResponse.data;

    const prompt = `
Você é um especialista em periféricos gamers.

Objetivo do cliente:
${objective}

Faixa desejada:
${profile}

Catálogo:
${JSON.stringify(products)}

REGRAS:

- Recomende somente produtos presentes no catálogo.
- Considere o objetivo e a faixa de qualidade.
- Se o pedido não tiver relação com periféricos gamers, responda exatamente:

{
  "productId": null,
  "reason": "Lamento, mas não posso ajudá-lo com isso."
}

- Nunca invente produtos.
- Responda SOMENTE JSON válido.
`;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
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

    const selectedProduct = products.find(
      (product: any) =>
        product.id === recommendation.productId
    );

    return NextResponse.json({
      product: selectedProduct ?? null,
      reason: recommendation.reason,
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
  }
}