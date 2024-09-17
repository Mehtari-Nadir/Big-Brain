"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "@/components/document-card";
import { UploadDocumentBtn } from "@/components/upload-document-btn";
import { LoadingCard } from "@/components/loading-card";

export default function DocumentPage() {

	const documents = useQuery(api.documents.getDocuments);

	return (
		<main className="p-10">
			<div className="flex items-center justify-between gap-x-4 mb-6">
				<h1 className="text-4xl font-bold">My Documents</h1>
				<UploadDocumentBtn />
			</div>
			<div className="grid grid-cols-3 gap-4">
				{documents == undefined &&
					new Array(6).fill("").map((_, index) => <LoadingCard key={index} />)
				}
				{documents?.map((doc, index) => {
					return <DocumentCard key={index} document={doc} />
				})}
			</div>
		</main>
	);
}