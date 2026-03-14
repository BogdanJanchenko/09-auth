"use client";

import css from "./Notes.module.css";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";

import type { NoteTag } from "@/types/note";
import type { FetchNotesResponse } from "@/lib/api/clientApi";

import toast, { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClient {
  category?: NoteTag | undefined;
}

const NotesClient = ({ category }: NotesClient) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [debounceSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debounceSearchQuery, currentPage, category],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage, category),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops, something went wrong while get the note.`);
      console.log(`Something went wrong while get the note: ${error}`);
    }
  }, [isError, error]);

  const notes = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <>
      <div className={css.app}>
        <Toaster position="top-right" reverseOrder={false} />
        <header className={css.toolbar}>
          <SearchBox
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          {notes && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        </header>
        {notes && <NoteList notes={notes} />}
      </div>
    </>
  );
};

export default NotesClient;
