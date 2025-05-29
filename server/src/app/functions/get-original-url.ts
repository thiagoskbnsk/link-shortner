import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from 'drizzle-orm';
import { EntryNotFound } from "./errors/entry-not-found";

type LinkOutput = {
	id: string;
	originalUrl: string;
	shortUrl: string;
	accessCount: number;
	createdAt: Date;
}

export async function getOriginalUrl(
	shortUrl: string,
): Promise<Either<EntryNotFound, LinkOutput>> {
	const link = await db
		.select()
		.from(schema.links)
		.where(eq(schema.links.shortUrl, shortUrl))
		.limit(1);

	if (link.length === 0) {
		return makeLeft(new EntryNotFound());
	}

	return makeRight(link[0]);
}
