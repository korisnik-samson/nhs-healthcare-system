import React from 'react';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const jakartaSans = FontSans({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font--sans',
});

export const metadata: Metadata = {
    title: "NHS CarePlus",
    description: "A healthcare management system for NHS hospitals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', jakartaSans.variable)}>
                <ThemeProvider attribute="class" defaultTheme="system">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
