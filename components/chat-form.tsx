"use client";

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
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
    text: z.string().min(1).max(250),
});

export const ChatForm = ({documentId}: {documentId: Id<"documents">}) => {

    const askQuestion = useAction(api.documents.askQuestion);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        await askQuestion({
            documentId: documentId,
            question: values.text
        });
        form.reset();

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between gap-x-2">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    disabled={form.formState.isSubmitting}
                                    placeholder="Ask any question over this document"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <LoadingButton
                    isSubmitting={form.formState.isSubmitting}
                    loadingText="Submiting..."
                >
                    Submit
                </LoadingButton>
            </form>
        </Form>
    );
}