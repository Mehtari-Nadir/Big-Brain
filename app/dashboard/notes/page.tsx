"use client"

import { UploadNoteBtn } from "@/components/upload-note-btn";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { NoteCard } from "@/components/note-card";
import { LoadingNoteSkeleton } from "@/components/loading-note";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { DeleteNoteBtn } from "@/components/delete-note-btn";
import { Id } from "@/convex/_generated/dataModel";
import { EditNoteBtn } from "@/components/edit-note-btn";

const NotesPage = () => {

    const notes = useQuery(api.notes.getNotes);

    const [noteValue, setNoteValue] = useState("");
    const [currentNote, setCurrentNote] = useState<Id<"notes">>();

    return (
        <main className="p-10">
            <div className="flex items-center justify-between gap-x-4 mb-6">
                <h1 className="text-4xl font-bold">Notes</h1>
                <div className="flex items-center justify-center gap-x-2">
                    {currentNote &&
                        <>
                            <DeleteNoteBtn
                                noteId={currentNote}
                                clearStates={() => {
                                    setNoteValue("");
                                    setCurrentNote(undefined);
                                }}
                            />
                            {/* <EditNoteBtn /> */}
                        </>
                    }
                    <UploadNoteBtn />
                </div>
            </div>
            <div className="flex h-[25rem] ">
                <div className="flex flex-col w-[35vw] h-[25rem] gap-y-2">
                    {notes == undefined &&
                        new Array(3).fill("").map((_, index) => <LoadingNoteSkeleton key={index} />)
                    }
                    {notes?.map((note, index) => {
                        return (
                            <NoteCard
                                key={index}
                                note={note}
                                onClick={() => {
                                    setCurrentNote(note._id);
                                    setNoteValue(note.text)
                                }}
                            />
                        );
                    })}
                </div>
                <Separator orientation="vertical" className="mx-6" />
                <Textarea
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                    disabled={noteValue == ""}
                />
            </div>
        </main>
    );
}

export default NotesPage;