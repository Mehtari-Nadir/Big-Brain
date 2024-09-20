"use client";

import { SearchForm } from "@/components/search-form";
import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const SearchPage = () => {
    
    const [notes, setNotes] = useState<Doc<"notes">[] | null>();
    
    return (
        <main className="p-10">
            <div className="flex flex-col items-start justify-start gap-x-4 mb-6">
                <h1 className="text-4xl font-bold mb-5">Search</h1>
                {/* <UploadDocumentBtn /> */}
                <SearchForm setNotes={setNotes} />
            </div>
            <div className="flex flex-col gap-y-2">
                {notes?.map((note, index) => {
                    return (
                        <Card key={index} className="truncate p-5">{note.text}</Card>
                    );
                })}
            </div>
        </main>
    );
}

export default SearchPage;