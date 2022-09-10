import { Users } from "@prisma/client";

export type AuthUser = Omit<Users, "id">;
