"use client";

import { useState } from "react";
import ModalBody from "../modals/ModalBody";
import ProductCard from "../layout/ProductCard";
import mouse from "@/media/images/mouse-generic.png"
import teclado from "@/media/images/teclado-generic.png"
import fone from "@/media/images/fone-generic.png"
import { CursorIcon } from "@/media/icon-component/CursorIcon";
import { FullLogoIcon } from "@/media/icon-component/FullLogoIcon";


interface AiChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    sender: "bot" | "user";
    text: string;
}

interface Product {
    id: string;
    name: string;
    defaultPrice: number;
    promotionalPrice?: number;
    type: string;
}

export default function AiChatModal({
    isOpen,
    onClose,
}: AiChatModalProps) {
    const [messages, setMessages] = useState<Message[]>(([
        {
            sender: "bot",
            text: "Opa como posso ajudar?"
        }
    ]));

    const [input, setInput] = useState("");
    const [step, setStep] = useState(1);

    const [objective, setObjective] = useState("");

    const [recommendedProduct, setRecommendedProduct] =
        useState<Product | null>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const answer = input.trim();

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: answer
            }
        ]);

        setInput("");

        if (step === 1) {
            setObjective(answer);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "Você procura algo Econômico, Intermediário ou Premium?"
                }
            ]);

            setStep(2);
            return;
        }
        if (step === 2) {
            try {
                setMessages(prev => [
                    ...prev,
                    {
                        sender: "bot",
                        text: "Analisando catálogo..."
                    }
                ]);

                const response = await fetch("/api/chat-ai", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        objective,
                        profile: answer
                    }),
                });

                if (!response.ok) {
                    throw new Error("Erro ao consultar IA");
                }

                const data = await response.json();

                setRecommendedProduct(data.product);

                setMessages(prev => [
                    ...prev,
                    {
                        sender: "bot",
                        text: data.reason,
                    },
                ]);

                setStep(3);
            } catch (error) {
                console.error(error);

                setMessages(prev => [
                    ...prev,
                    {
                        sender: "bot",
                        text: "Erro ao gerar recomendação.",
                    },
                ]);
            }
        }


    };

    return (
        <ModalBody
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="700px"
            maxHeight="700px"
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "700px"
                }}
            >
                <div
                    style={{
                        padding: "16px",
                        borderBottom: "1px solid #ddd",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"space-between"
                    }}
                >
                    <h2>Assistente de Compras</h2>
                    <FullLogoIcon height={20} width={70} fill={"#0D3B5D"}/>
                </div>

                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "16px"
                    }}
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent:
                                    message.sender === "user"
                                        ? "flex-end"
                                        : "flex-start",
                                marginBottom: "12px"
                            }}
                        >
                            <div
                                style={{
                                    background:
                                        message.sender === "user"
                                            ? "#2563eb"
                                            : "#e5e7eb",
                                    color:
                                        message.sender === "user"
                                            ? "#fff"
                                            : "#000",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    maxWidth: "80%"
                                }}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}

                    {recommendedProduct && (
                        <ProductCard
                            id={recommendedProduct.id}
                            key={recommendedProduct.id}
                            image={recommendedProduct.type.toLowerCase() === "mouse"
                                        ? mouse
                                        : recommendedProduct.type.toLowerCase() === "keyboard"
                                            ? teclado
                                            : fone}
                            name={recommendedProduct.name}
                            originalPrice={recommendedProduct.defaultPrice}
                            promotionalPrice={recommendedProduct.promotionalPrice}
                        />
                    )}
                </div>

                {step < 3 && (
                    <div
                        style={{
                            borderTop: "1px solid #ddd",
                            padding: "16px",
                            display: "flex",
                            gap: "8px"
                        }}
                    >
                        <input
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            style={{
                                flex: 1,
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "8px"
                            }}
                        />

                        <button
                            onClick={sendMessage}
                            style={{
                                backgroundColor: "#2563eb",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 16px",
                                cursor: "pointer"
                            }}
                        >
                            Enviar
                        </button>
                    </div>
                )}
            </div>
        </ModalBody>
    );
}