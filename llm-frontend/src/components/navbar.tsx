import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Group, Title } from "@mantine/core";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"],
});

export const Navbar = () => {
    return (
        <Container fluid p="sm" style={{ backgroundColor: "transparent" }}>
            <Group justify="space-between" align="center">
                <Link
                    href="/"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <div
                        style={{
                            position: "relative",
                            marginRight: "0.5rem",
                            marginLeft: "1rem",
                        }}
                    >
                        <Image
                            alt="Logo"
                            width={50}
                            height={50}
                            src="/govtechLogo.png"
                        />
                    </div>
                    <Title
                        order={1}
                        style={{
                            fontSize: "24px",
                            background:"linear-gradient(to right, #4ade80, #3b82f6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: font.style.fontFamily,
                        }}
                    >
                        GTChat
                    </Title>
                </Link>
            </Group>
        </Container>
    );
};
