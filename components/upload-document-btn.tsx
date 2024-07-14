import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UploadDocumentForm } from "./upload-document-form";
import { useState } from "react";
import { Upload } from "lucide-react";

export const UploadDocumentBtn = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button className="gap-x-2">
                    <Upload size={"18"} />
                    Upload a document
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a document</DialogTitle>
                    <DialogDescription>
                        Upload a team document for you to search over in the future
                    </DialogDescription>
                </DialogHeader>
                <UploadDocumentForm onUpload={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}