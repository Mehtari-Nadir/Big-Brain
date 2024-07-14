import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "./loading-btn";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
    title: z.string().min(1).max(250),
    file: z.instanceof(File)
});

export const UploadDocumentForm = ({ onUpload }: { onUpload: () => void }) => {

    const createDocument = useMutation(api.documents.createDocument);
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        const url = await generateUploadUrl();
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": values.file!.type },
            body: values.file
        });
        const { storageId } = await response.json();

        await createDocument({
            title: values.title,
            storageId: storageId
        })
        onUpload();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Expense Report" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldProps}
                                    type="file"
                                    accept=".txt"
                                    placeholder="Expense Report"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    isSubmitting={form.formState.isSubmitting}
                    loadingText="Uploading..."
                >
                    Upload
                </LoadingButton>
            </form>
        </Form>
    );
}