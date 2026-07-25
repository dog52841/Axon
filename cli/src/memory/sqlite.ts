import { Database } from "bun:sqlite";
import { join } from "node:path";

import type { Activity, Workspace } from "../types";

export class MemoryStore {
  private readonly database: Database;

  constructor(workspace: Workspace) {
    this.database = new Database(join(workspace.path, "history.db"), {
      create: true,
    });
    this.database.run(`
      CREATE TABLE IF NOT EXISTS activity (
        id INTEGER PRIMARY KEY,
        at TEXT NOT NULL,
        kind TEXT NOT NULL,
        message TEXT NOT NULL
      )
    `);
  }

  append(activity: Activity): void {
    this.database
      .query("INSERT INTO activity (at, kind, message) VALUES (?, ?, ?)")
      .run(activity.at, activity.kind, activity.message);
  }

  recent(limit = 10): Activity[] {
    return this.database
      .query<Activity, [number]>(
        "SELECT at, kind, message FROM activity ORDER BY id DESC LIMIT ?",
      )
      .all(limit)
      .reverse();
  }

  search(query: string, limit = 20): Activity[] {
    const pattern = `%${query.trim().replace(/%|_/g, "\\$&")}%`;
    return this.database
      .query<Activity, [string, number]>(
        "SELECT at, kind, message FROM activity WHERE message LIKE ? ESCAPE '\\' ORDER BY id DESC LIMIT ?",
      )
      .all(pattern, limit)
      .reverse();
  }

  count(): number {
    return (
      this.database
        .query<{ count: number }, []>("SELECT COUNT(*) AS count FROM activity")
        .get()?.count ?? 0
    );
  }

  close(): void {
    this.database.close();
  }
}
