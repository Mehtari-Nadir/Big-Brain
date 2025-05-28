"use client";

import { SearchForm } from "@/components/search-form";
import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";

const SearchPage = () => {
    
    // const [notes, setNotes] = useState<Doc<"notes">[] | null>();
    const [notes, setNotes] = useState<typeof api.search.searchAction._returnType>();
    
    return (
        <main className="p-10">
            <div className="flex flex-col items-start justify-start gap-x-4 mb-6">
                <h1 className="text-4xl font-bold mb-5">Vector Search</h1>
                {/* <UploadDocumentBtn /> */}
                <SearchForm setNotes={setNotes} />
            </div>
            <div className="flex flex-col gap-y-2">
                {notes?.map((note, index) => {
                    return (
                        <Card key={index} className="p-5">
                            {note.text.substring(0, 200) + "..."}
                        </Card>
                    );
                })}
            </div>
        </main>
    );
}

export default SearchPage;