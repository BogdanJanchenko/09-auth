import { fetchNotes } from "@/lib/api/serverApi";
import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Category = NoteTag | "All";

interface NotesByCategoryProps {
  params: Promise<{ slug: Category[] }>;
}

const formatTag = (category?: Category): NoteTag | undefined => {
  if (!category || category.toLowerCase() === "all") return undefined;
  return (category.charAt(0).toUpperCase() +
    category.slice(1).toLowerCase()) as NoteTag;
};

export async function generateMetadata({
  params,
}: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const category = formatTag(slug?.[0]) ?? "All";
  return {
    title: `Notes category: ${category}`,
    description: `Filtering notes for a category: ${category}`,
    openGraph: {
      title: `Notes category: ${category}`,
      description: `Filtering notes for a category: ${category}`,
      url: `https://notehub.com/notes/filter/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Just logo NoteHub",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes category: ${category}`,
      description: `Filtering notes for a category: ${category}`,
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const { slug } = await params;
  const category = formatTag(slug?.[0]);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
