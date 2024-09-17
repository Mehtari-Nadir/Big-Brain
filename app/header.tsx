import { BrainCircuit, } from "lucide-react";
import { HeaderActions } from "./header-actions";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Header = () => {
    return (
        <div className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center justify-between gap-x-10">
                    <Link href={"/"}>
                        <BrainCircuit strokeWidth={2} size={28} color="white" />
                    </Link>
                    <div className="flex items-center justify-center gap-x-0">
                        <OrganisationDropDown />
                        <DashboardDropDown />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <HeaderActions />
                </div>
            </div>
        </div>
    );
}

const OrganisationDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"} className="focus-visible:ring-0 focus-visible:ring-offset-0">
                    Organizations
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-x-2">
                    <Image src="./org-logos/org-one.svg" alt="org logo" width={20} height={20} />
                    Stackintech
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-x-2">
                    <Image src="./org-logos/org-two.svg" alt="org logo" width={20} height={20} />
                    Taskflow
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-x-2">
                    <Image src="./org-logos/org-three.svg" alt="org logo" width={20} height={20} />
                    SpeedFast
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const DashboardDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"} className="focus-visible:ring-0 focus-visible:ring-offset-0">
                    Dashboard
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild><Link href={"/dashboard/documents"}>Documents</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href={"/dashboard/notes"}>Notes</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href={"/dashboard/search"}>Search</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}