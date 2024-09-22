"use client"

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider withCssVariables defaultColorScheme="light">
                {children}
            </MantineProvider>
        </QueryClientProvider>
    );
}
