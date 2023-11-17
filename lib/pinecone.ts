import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("pinecone api key not found");
}

const pinecone = new Pinecone({
  environment: "gcp-starter",
  apiKey: apiKey,
});

export const noteIndex = pinecone.index("note-ai");
