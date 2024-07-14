"use client";

import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "@/components/theme-provider";

export const Provider = ({ children }: { children: React.ReactNode }) => {

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
        >
            <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
                <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                    {children}
                </ConvexProviderWithClerk>
            </ClerkProvider>
        </ThemeProvider>
    );
}