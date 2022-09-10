import { Credentials } from "@prisma/client";

export type CreateCredential = Omit<Credentials, "id">;
