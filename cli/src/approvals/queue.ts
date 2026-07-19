import { Database } from "bun:sqlite";
import { join } from "node:path";

import type { Workspace } from "../types";

export type ApprovalStatus = "pending" | "approved" | "denied";

export interface Approval {
  id: number;
  description: string;
  status: ApprovalStatus;
  createdAt: string;
}

export class ApprovalQueue {
  private readonly database: Database;

  constructor(workspace: Workspace) {
    this.database = new Database(join(workspace.path, "tasks.db"), {
      create: true,
    });
    this.database.run(`
      CREATE TABLE IF NOT EXISTS approval (
        id INTEGER PRIMARY KEY,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `);
  }

  pending(): Approval[] {
    return this.database
      .query<Approval, []>(
        "SELECT id, description, status, created_at AS createdAt FROM approval WHERE status = 'pending' ORDER BY id ASC",
      )
      .all();
  }

  resolve(id: number, status: Exclude<ApprovalStatus, "pending">): boolean {
    return (
      this.database
        .query(
          "UPDATE approval SET status = ? WHERE id = ? AND status = 'pending'",
        )
        .run(status, id).changes > 0
    );
  }

  close(): void {
    this.database.close();
  }
}
