"use client";

import { useState } from "react";
import ModalBody from "../modals/ModalBody";
import ProductCard from "../layout/ProductCard";
import mouse from "@/media/images/mouse-generic.png"
import teclado from "@/media/images/teclado-generic.png"
import fone from "@/media/images/fone-generic.png"
import { CursorIcon } from "@/media/icon-component/CursorIcon";
import { FullLogoIcon } from "@/media/icon-component/FullLogoIcon";
import { Button } from "../button/Button";


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
    const [count, setCount] = useState<number>(0)
    const [messages, setMessages] = useState<Message[]>(([
        {
            sender: "bot",
            text: "Opa como posso ajudar?"
        }
    ]));

    const openAiMessages = messages.map(message => ({
        role:
            message.sender === "user"
                ? "user"
                : "assistant",
        content: message.text,
    }));

    const [input, setInput] = useState("");

    const [recommendedProducts, setRecommendedProducts] =
        useState<Product[]>([]);

    const sendMessage = async () => {
        setCount( count + 1)
        setRecommendedProducts([])
        if (!input.trim()) return;

        const userMessage: Message = {
            sender: "user",
            text: input.trim(),
        };

        const updatedMessages = [
            ...messages,
            userMessage,
        ];

        setMessages(updatedMessages);
        setInput("");

        try {
            const response = await fetch(
                "/api/chat-ai",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        messages: updatedMessages.map(
                            message => ({
                                role:
                                    message.sender ===
                                        "user"
                                        ? "user"
                                        : "assistant",
                                content:
                                    message.text,
                            })
                        ),
                    }),
                }
            );

            const data =
                await response.json();

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: data.message,
                },
            ]);

            if (data.products?.length) {
                setRecommendedProducts(prev => [
                    ...prev,
                    ...data.products.filter(
                        (newProduct: Product) =>
                            !prev.some(
                                existing =>
                                    existing.id ===
                                    newProduct.id
                            )
                    ),
                ]);
            }
        } catch (error) {
            console.error(error);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "Erro ao consultar assistente.",
                },
            ]);
        }
    };

    const resetChat = () => {
        setMessages([
            {
                sender: "bot",
                text: "Olá! Como posso ajudar você a encontrar um periférico?"
            }
        ]);
        setCount(0)
        setRecommendedProducts([]);
        setInput("");
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
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                >
                    <FullLogoIcon height={40} width={120} fill={"#0D3B5D"} />
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
                    <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                        {recommendedProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                image={
                                    product.type.toLowerCase() === "mouse"
                                        ? mouse
                                        : product.type.toLowerCase() ===
                                            "keyboard"
                                            ? teclado
                                            : fone
                                }
                                name={product.name}
                                originalPrice={product.defaultPrice}
                                promotionalPrice={
                                    product.promotionalPrice
                                }
                                onClose={onClose}
                            />
                        ))}
                    </div>


                </div>


                <div
                    style={{
                        borderTop: "1px solid #ddd",
                        padding: "16px",
                        display: "flex",
                        gap: "8px"
                    }}
                >
                    {
                        count < 3 && (
                            <>
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
                                    spellCheck={false}
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
                                        backgroundColor: "var(--dark-blue-100)",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "10px 16px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <i className="ri-send-plane-fill" />
                                </button>
                            </>
                        )
                    }

                    <Button height="46px" onClick={resetChat} maxWidth={count < 3 ? "44px" : "100%"} bgColor="#d4d4d4">
                        <i className="ri-reset-left-line" />
                    </Button>
                </div>
            </div>
        </ModalBody>
    );
}