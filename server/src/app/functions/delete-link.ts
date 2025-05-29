import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from 'drizzle-orm';
import { EntryNotFound } from "./errors/entry-not-found";

type DeletedLinkOutput = {
	id: string;
	originalUrl: string;
	shortUrl: string;
	accessCount: number;
	createdAt: Date;
};

export async function deleteLink(id: string): Promise<Either<EntryNotFound, DeletedLinkOutput>> {
	const deletedLink = await db.delete(schema.links).where(eq(schema.links.id, id)).returning();

	if (deletedLink.length) {
		return makeRight(deletedLink[0]);
	}

	return makeLeft(new EntryNotFound());
}
