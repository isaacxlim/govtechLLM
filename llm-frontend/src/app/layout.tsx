import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GT LLM",
    description: "Your AI Assistant ",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MantineProvider withCssVariables defaultColorScheme="light">
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
