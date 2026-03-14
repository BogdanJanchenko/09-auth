import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note, NoteTag } from "@/types/note";

// ------------------------------------------------
// Notes API
// ------------------------------------------------

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const PER_PAGE = 12;

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage: PER_PAGE, tag },
  });
  return response.data;
};

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", newNote);
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

// ------------------------------------------------
// Auth API
// ------------------------------------------------

export interface AuthProps {
  email: string;
  password: string;
}

export const register = async ({
  email,
  password,
}: AuthProps): Promise<User> => {
  const response = await nextServer.post<User>("/auth/register", {
    email,
    password,
  });
  return response.data;
};

export const login = async ({ email, password }: AuthProps): Promise<User> => {
  const response = await nextServer.post<User>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export interface MessageResponse {
  message?: string;
}

export const logout = async (): Promise<MessageResponse> => {
  const response = await nextServer.post<MessageResponse>("/auth/logout");
  return response.data;
};

export const checkSession = async (): Promise<MessageResponse> => {
  const response = await nextServer.get<MessageResponse>("/auth/session");
  return response.data;
};

// ------------------------------------------------
// User API
// ------------------------------------------------

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
};

export interface UpdateMeProps {
  username: string;
}

export const updateMe = async ({ username }: UpdateMeProps): Promise<User> => {
  const response = await nextServer.patch<User>("/users/me", {
    username,
  });
  return response.data;
};
