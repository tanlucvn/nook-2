import type { Session } from "@nook/auth";
import type { Database } from "@nook/db";

export type Context = {
  session: Session | null;
  db: Database;
};
