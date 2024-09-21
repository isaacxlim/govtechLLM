"use client";

import axios from "axios";
import { useState, useRef } from "react";
import { Button, Box, Textarea, Group, Loader, NativeSelect } from "@mantine/core";
import toast from "react-hot-toast";

// Available models for selection
const models = [
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gpt-4", label: "GPT-4" },
];

const ChatPage = () => {
    const [conversations, setConversations] = useState<
        {
            id: string;
            title: string;
            messages: { content: string; role: string }[];
        }[]
    >([]);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(models[0].value); // Default to GPT-3.5 Turbo
    const [isLoading, setIsLoading] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Create a new conversation
    const handleNewConversation = () => {
        const newConversation = {
            id: `${Date.now()}`,
            title: `Conversation ${conversations.length + 1}`,
            messages: [],
        };
        setConversations((prev) => [newConversation, ...prev]);
        setSelectedConversation(newConversation.id);
    };

    // Delete a conversation
    const handleDeleteConversation = (id: string) => {
        setConversations((prev) => prev.filter((conv) => conv.id !== id));
        if (selectedConversation === id) setSelectedConversation(null);
    };

    // Fetch messages for a conversation
    const getConversationMessages = () => {
        return conversations.find((conv) => conv.id === selectedConversation)?.messages || [];
    };

    const onSubmit = async (prompt: string) => {
        if (!selectedModel || !selectedConversation) {
            toast.error("Please select a model and conversation.");
            return;
        }

        setIsLoading(true);

        try {
            const userMessage = { content: prompt, role: "user" };
            const updatedConversations = conversations.map((conv) =>
                conv.id === selectedConversation
                    ? { ...conv, messages: [...conv.messages, userMessage] }
                    : conv
            );
            setConversations(updatedConversations);

            const { data } = await axios.post("/api/chat", {
                prompt,
                model: selectedModel,
            });

            const botMessage = { content: data.message, role: "assistant" };

            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === selectedConversation
                        ? { ...conv, messages: [...conv.messages, botMessage] }
                        : conv
                )
            );
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* Sidebar */}
            <Box
                style={{
                    width: "300px",
                    padding: "16px",
                    borderRight: "1px solid #eee",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden", // Prevent sidebar scrolling
                }}
            >
                <Button fullWidth onClick={handleNewConversation} style={{ marginBottom: "16px" }}>
                    New Conversation
                </Button>

                <Box style={{ flexGrow: 1, overflowY: "auto" }}>
                    {conversations.map((conv) => (
                        <Box
                            key={conv.id}
                            style={{
                                padding: "8px",
                                backgroundColor:
                                    conv.id === selectedConversation ? "#f0f0f0" : "transparent",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                cursor: "pointer",
                                borderBottom: "1px solid #ddd",
                            }}
                            onClick={() => setSelectedConversation(conv.id)}
                        >
                            <span>{conv.title}</span>
                            <Button
                                variant="subtle"
                                size="xs"
                                color="red"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteConversation(conv.id);
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Chat Area */}
            <Box
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // Adjusts the spacing for the chat and form
                    height: "100%", // Makes the chat box take the full height
                }}
            >
                {selectedConversation ? (
                    <>
                        {/* Model Selection */}
                        <Box style={{ padding: "16px" }}>
                            <NativeSelect
                                data={models}
                                value={selectedModel ?? ""}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                style={{ width: "0px" }}
                            />
                        </Box>

                        {/* Display messages */}
                        <Box
                            style={{
                                flexGrow: 1,
                                overflowY: "auto",
                                padding: "16px",
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
                                            message.role === "user" ? "#e0f7fa" : "#f0f0f0",
                                        alignSelf: message.role === "user" ? "flex-end" : "flex-start",
                                    }}
                                >
                                    <strong>{message.role === "user" ? "You" : "AI"}: </strong>
                                    {message.content}
                                </Box>
                            ))}
                        </Box>

                        {/* Form at the bottom */}
                        <Box
                            style={{
                                position: "sticky",
                                bottom: 0,
                                width: "100%",
                                backgroundColor: "#fff",
                                padding: "16px",
                                borderTop: "1px solid #ddd",
                            }}
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target as HTMLFormElement);
                                    const prompt = formData.get("prompt") as string;
                                    if (prompt) onSubmit(prompt);
                                    (e.target as HTMLFormElement).reset();
                                }}
                            >
                                <Group align="center" style={{ flexGrow: 1 }}>
                                    <Textarea
                                        name="prompt"
                                        placeholder="Type your message..."
                                        autosize
                                        minRows={2} // Bigger textarea
                                        maxRows={4} // Limit the rows when typing long messages
                                        style={{
                                            flexGrow: 1,
                                            borderRadius: "12px", // Rounded corners for the Textarea
                                            padding: "12px", // Additional padding for better spacing
                                        }}
                                        disabled={isLoading}
                                    />
                                    <Button type="submit" disabled={isLoading}>
                                        Send
                                    </Button>
                                </Group>
                            </form>
                        </Box>
                    </>
                ) : (
                    <Box style={{ textAlign: "center", marginTop: "20px" }}>
                        <p>Select or create a conversation to get started.</p>
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
