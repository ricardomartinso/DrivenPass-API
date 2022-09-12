import { Wifis } from "@prisma/client";

export type CreateWifi = Omit<Wifis, "id">;
