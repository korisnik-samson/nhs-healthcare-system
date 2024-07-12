import React from 'react';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const fontSans: NextFontWithVariable = FontSans({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: "NHS CarePulse",
    description: "A healthcare management system for NHS hospitals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    {children}
                    <Toaster richColors expand={false} position='top-center'/>
                </ThemeProvider>

            </body>
        </html>
    );
}
