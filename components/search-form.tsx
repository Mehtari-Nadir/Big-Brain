"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "./loading-btn";
import { Input } from "@/components/ui/input";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

const formSchema = z.object({
    search: z.string()
        .min(2, { message: "Hey the content is not enough" })
        .max(250, { message: "Its too loong" })
});

export const SearchForm = ({
    setNotes
}: {
    setNotes: (notes: Doc<"notes">[] | null) => void
}) => {

    const searchAction = useAction(api.search.searchAction);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: ""
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        await searchAction({
            search: values.search
        }).then(setNotes);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex justify-between items-center gap-x-2">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            {/* <FormLabel>Note Body</FormLabel> */}
                            <FormControl>
                                <Input {...field} placeholder="Search over all your notes and documents using vector searching" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    isSubmitting={form.formState.isSubmitting}
                    loadingText="Searching..."
                >
                    Search
                </LoadingButton>
            </form>
        </Form>
    );
}