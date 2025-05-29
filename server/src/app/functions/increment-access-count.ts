import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, sql } from "drizzle-orm";

export async function incrementAccessCount(id: string): Promise<void> {
	await db
		.update(schema.links)
		.set({ accessCount: sql`${schema.links.accessCount} + 1` })
		.where(eq(schema.links.id, id));
}
