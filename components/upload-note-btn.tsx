"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UploadNoteForm } from "./upload-note-form";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

export const UploadNoteBtn = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button className="gap-x-2">
                    <PlusIcon size={"18"} />
                    Create Note
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Note</DialogTitle>
                    <DialogDescription>
                        Type what ever note you want to be searchable later.
                    </DialogDescription>
                </DialogHeader>
                <UploadNoteForm closeDialog={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}