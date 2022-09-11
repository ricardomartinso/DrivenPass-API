import { SafeNotes } from "@prisma/client";

export type CreateSafeNotes = Omit<SafeNotes, "id">;
