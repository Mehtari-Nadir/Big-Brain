"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState, useEffect } from "react";

export const TypeWriter = ({ text, delay, documentId }: { text: string, delay: number, documentId: Id<"documents"> }) => {

    const updateDescriptionState = useMutation(api.documents.updateDescriptionState);

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
        // * The code below ensures that this component runs once for each document
        updateDescriptionState({
            documentId: documentId
        });
    }, [currentIndex, delay, text]);

    return (
        <span>{currentText}</span>
    );
}