"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  JOURNAL_COLLECTION_ID,
  PROJECT_ID,
  storage,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

interface JournalFilters {
  search: string;
  date: string;
}

export const getJournalEntries = async (filters: JournalFilters) => {
  const queries = [];

  if (filters.search) {
    queries.push(Query.search("title", filters.search));
  }

  if (filters.date && filters.date != "Invalid date") {
    queries.push(Query.equal("date", filters.date));
  }

  console.log({ queries });

  const journalEntries = await databases.listDocuments(DATABASE_ID!, JOURNAL_COLLECTION_ID!, queries);
  return parseStringify(journalEntries.documents);
};

export const getSingleJournalEntry = async (id: string) => {
  const journalEntries = await databases.listDocuments(DATABASE_ID!, JOURNAL_COLLECTION_ID!, [Query.equal("$id", id)]);
  return parseStringify(journalEntries.documents[0]);
};

export const saveJournalEntry = async ({ images, ...form }: any) => {
  try {
    let currentEntry;

    if (form.journal_id) {
      currentEntry = await databases.updateDocument(DATABASE_ID!, JOURNAL_COLLECTION_ID!, form.journal_id, {
        imageURL: images || null,
        title: form.title || "",
        content: form.content || "",
        date: form.date,
      });
    } else {
      currentEntry = await databases.createDocument(DATABASE_ID!, JOURNAL_COLLECTION_ID!, ID.unique(), {
        imageURL: images || null,
        ...form,
      });
    }

    return currentEntry;
  } catch (error: any) {
    console.log({ error });
  }
};
