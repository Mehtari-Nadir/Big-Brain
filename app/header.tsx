import { Brain } from "lucide-react";
import { HeaderActions } from "./header-actions";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Header = () => {
    return (
        <div className="bg-slate-700 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-x-1">
                    <Brain />
                    <h1 className="text-2xl">BigBrain</h1>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <HeaderActions />
                </div>
            </div>
        </div>
    );
}