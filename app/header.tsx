import { Brain} from "lucide-react";
import { HeaderActions } from "./header-actions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export const Header = () => {
    return (
        <div className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"} className="flex items-center gap-x-1" >
                    <Brain />
                    <h1 className="text-2xl">BigBrain</h1>
                </Link>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <HeaderActions />
                </div>
            </div>
        </div>
    );
}