"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {
    Button,
    Box,
    Textarea,
    Loader,
    NativeSelect,
} from "@mantine/core";
import toast from "react-hot-toast";
import { SendHorizontal, Trash2 } from "lucide-react"; // Import the icon
import { useMutation } from "@tanstack/react-query"; // React Query

const models = [
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini" },
];

interface Message {
    content: string;
    role: "user" | "assistant";
}

interface Conversation {
    id: string;
    title: string;
    messages: Message[];
}

interface ApiResponse {
    message: string;
}

const ChatPage = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo");
    const [isLoading, setIsLoading] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [conversations, selectedConversation]);

    useEffect(() => {
        if (!isLoading) {
            textareaRef.current?.focus();
        }
    }, [isLoading]);

    const handleNewConversation = () => {
        const newConversation = {
            id: `${Date.now()}`,
            title: `Conversation ${conversations.length + 1}`,
            messages: [],
        };
        setConversations((prev) => [newConversation, ...prev]);
        setSelectedConversation(newConversation.id);
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };

    const handleDeleteConversation = (id: string) => {
        setConversations((prev) => prev.filter((conv) => conv.id !== id));
        if (selectedConversation === id) setSelectedConversation(null);
    };

    const getConversationMessages = () => {
        return (
            conversations.find((conv) => conv.id === selectedConversation)
                ?.messages || []
        );
    };

    const mutation = useMutation<ApiResponse, Error, { prompt: string; model: string }>({
        mutationFn: async ({ prompt, model }) => {
            const { data } = await axios.post<ApiResponse>("/api/chat", { prompt, model });
            return data;
        },
        onMutate: async ({ prompt }) => {
            setIsLoading(true);
            const userMessage: Message = { content: prompt, role: "user" };

            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === selectedConversation
                        ? { ...conv, messages: [...conv.messages, userMessage] }
                        : conv
                )
            );
        },
        onSuccess: (data) => {
            const botMessage: Message = { content: data.message, role: "assistant" };

            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === selectedConversation
                        ? { ...conv, messages: [...conv.messages, botMessage] }
                        : conv
                )
            );
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        },
        onSettled: () => {
            setIsLoading(false);
            textareaRef.current?.focus();
        },
    });

    const onSubmit = (prompt: string) => {
        if (!selectedModel || !selectedConversation) {
            toast.error("Please select a model and conversation.");
            return;
        }

        mutation.mutate({ prompt, model: selectedModel });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const prompt = textareaRef.current?.value.trim();
            if (prompt) {
                onSubmit(prompt);
                if (textareaRef.current) {
                    textareaRef.current.value = ""; 
                }
            }
        }
    };

    return (
        <div style={{ display: "flex", height: "93vh", overflow: "hidden" }}>
            <Box
                style={{
                    width: "300px",
                    padding: "16px",
                    borderRight: "1px solid #575757",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    flexShrink: 0, 
                }}
            >
                <Button
                    fullWidth
                    onClick={handleNewConversation}
                    style={{
                        marginBottom: "16px",
                        backgroundColor: "#b8b8b8",
                        borderRadius: "10px",
                        padding: "8px 20px",
                        color: "black",
                    }}
                >
                    Start a New Conversation
                </Button>
                <hr style={{ borderColor: "#ddd" }} />

                <Box style={{ flexGrow: 1, overflowY: "auto" }}>
                    {conversations.map((conv) => (
                        <Box
                            key={conv.id}
                            style={{
                                padding: "8px",
                                backgroundColor:
                                    conv.id === selectedConversation
                                        ? "#f0f0f0"
                                        : "transparent",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                                marginTop: "8px",
                                borderRadius: "8px",
                            }}
                            onClick={() => {
                                setSelectedConversation(conv.id);
                                setTimeout(() => {
                                    textareaRef.current?.focus();
                                }, 0);
                            }}
                        >
                            <span>{conv.title}</span>
                            <Button
                                variant="subtle"
                                size="xs"
                                style={{ color: "gray" }} // Change the color here
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteConversation(conv.id);
                                }}
                            >
                                <Trash2 />
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    position: "relative",
                    padding: "16px",
                    boxSizing: "border-box",
                }}
            >
                {selectedConversation ? (
                    <>
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "16px",
                            }}
                        >
                            <h2 style={{ margin: 0, fontSize: "24px" }}>
                                {conversations.find(
                                    (conv) => conv.id === selectedConversation
                                )?.title || "No Title"}
                            </h2>

                            <Box
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <span>Select Model:</span>
                                <NativeSelect
                                    data={models}
                                    value={selectedModel ?? ""}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    styles={{
                                        input: {
                                            padding: "3px 6px",
                                            border: "1px solid #000",
                                            borderRadius: "5px",
                                        },
                                    }}
                                    style={{ width: "0%" }}
                                />
                            </Box>
                        </Box>

                        <Box
                            ref={chatContainerRef} // Set the ref for the chat scroll container
                            style={{
                                flexGrow: 1,
                                overflowY: "auto", // Enable scrolling
                                paddingBottom: "16px",
                                boxSizing: "border-box",
                            }}
                        >
                            {getConversationMessages().map((message, index) => (
                                <Box
                                    key={index}
                                    style={{
                                        padding: "12px",
                                        marginBottom: "8px",
                                        borderRadius: "8px",
                                        backgroundColor:
                                            message.role === "user"
                                                ? "#e0f7fa"
                                                : "#f0f0f0",
                                        alignSelf:
                                            message.role === "user"
                                                ? "flex-end"
                                                : "flex-start",
                                    }}
                                >
                                    <strong>
                                        {message.role === "user" ? "You" : "AI"}
                                        :{" "}
                                    </strong>
                                    {message.content}
                                </Box>
                            ))}
                        </Box>

                        <Box
                            style={{
                                height: "13vh",
                                padding: "16px",
                                borderTop: "1px solid #ddd",
                                backgroundColor: "#fff",
                            }}
                        >
                            <form
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <textarea
                                    ref={textareaRef}
                                    name="prompt"
                                    placeholder="Type your message..."
                                    rows={2}
                                    style={{
                                        width: "100%",
                                        borderRadius: "12px",
                                        padding: "12px",
                                        resize: "none",
                                        flex: "1",
                                        borderWidth: "1px",
                                    }}
                                    disabled={isLoading}
                                    onKeyDown={handleKeyDown}
                                />
                                <Button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => {
                                        const prompt = textareaRef.current?.value.trim();
                                        if (prompt) {
                                            onSubmit(prompt);
                                            if (textareaRef.current) {
                                                textareaRef.current.value = "";
                                            }
                                        }
                                    }}
                                    style={{
                                        marginLeft: "12px",
                                        borderRadius: "50%",
                                        height: "40px",
                                        width: "40px",
                                        padding: 0,
                                    }}
                                >
                                    <SendHorizontal />
                                </Button>
                            </form>
                        </Box>
                    </>
                ) : (
                    <Box style={{ textAlign: "center", marginTop: "200px" }}>
                        <p>Select or create a conversation to get started.</p>
                        <Button
                            onClick={handleNewConversation}
                            style={{
                                marginTop: "16px",
                                backgroundColor: "rgba(0, 102, 227, 0.7)",
                                color: "white",
                                borderRadius: "20px",
                                padding: "8px 20px",
                            }}
                        >
                            Start New Conversation
                        </Button>
                    </Box>
                )}

                {isLoading && (
                    <Box style={{ textAlign: "center", marginTop: "16px" }}>
                        <Loader size="lg" />
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default ChatPage;
