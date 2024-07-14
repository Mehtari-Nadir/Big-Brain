"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {

  const createDocument = useMutation(api.documents.createDocument);
  const getDocuments = useQuery(api.documents.getDocuments);

  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <button
          onClick={() => {
            createDocument({title: "Test"});
          }}
        >Add Doc</button>
        <div>
          {getDocuments?.map((doc, index) => {
            return <h1 key={index}>{doc.title}</h1>
          })}
        </div>
      </Authenticated>
    </main>
  );
}
