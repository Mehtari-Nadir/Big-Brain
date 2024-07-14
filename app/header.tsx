"use client";

import { Brain } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Header = () => {
    return (
        <div className="bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-x-1">
                    <Brain className="text-pink-500" />
                    <h1 className="text-2xl"><span className="text-pink-500">Big</span>Brain</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Unauthenticated>
                        <SignInButton />
                    </Unauthenticated>
                    <Authenticated>
                        <UserButton />
                        <ModeToggle />
                    </Authenticated>
                </div>
            </div>
        </div>
    );
}