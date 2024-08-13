"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";

export interface AppProviderProps {
    children: React.ReactNode;
    className?: string;
    themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: AppProviderProps) {
    const router = useRouter();

    return (
        <NextUIProvider locale="es-ES" navigate={router.push}>
            <NextThemesProvider>{children}</NextThemesProvider>
        </NextUIProvider>
    );
}

