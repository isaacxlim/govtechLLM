"use client";

import React from "react";
import Link from "next/link";
import { Button, Container, Text, Title } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const LandingHero = () => {
    return (
        <Container
            size="md"
            style={{
                textAlign: "center",
                marginTop: "2rem",
                marginBottom: "3rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                }}
            >
                <Image
                    alt="Logo"
                    width={150}
                    height={150}
                    src="/govtechLogo.png"
                />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    padding: "0.5rem 1.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    maxWidth: "250px",
                }}
            >
                <Text size="sm" fw={500} c="gray.7">
                    Chat with OpenAI's GPT
                </Text>
            </div>

            {/* Hero Section */}
            <Title order={1} style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                Have a{" "}
                <span
                    style={{
                        background:
                            "linear-gradient(to right, #4ade80, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Conversation
                </span>{" "}
                with OpenAI's GPT models!
            </Title>

            <Text
                size="lg"
                color="dimmed"
                style={{ maxWidth: "40rem", margin: "0 auto 1rem" }}
            >
                Chat with OpenAI's different models to generate text responses
                based on the input you provide. Whether you need help with
                writing, brainstorming ideas, or just having a friendly
                conversation, our AI models are here to assist you. Get Started
                Now!
            </Text>

            {/* CTA Button with Link to /home */}
            <Link href="/home" passHref legacyBehavior>
                <Button
                    size="lg"
                    radius="xl"
                    style={{
                        padding: "0.75rem 2rem",
                        marginTop: "1.5rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "rgba(0, 102, 227, 0.7)",
                        color: "white",
                    }}
                >
                    <span style={{ display: "flex", alignItems: "center" }}>
                        Get Started
                        <ArrowRight
                            size={20}
                            style={{ marginLeft: "0.5rem" }}
                        />
                    </span>
                </Button>
            </Link>
        </Container>
    );
};
