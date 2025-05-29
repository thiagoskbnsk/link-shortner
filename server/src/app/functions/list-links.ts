import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeRight } from "@/infra/shared/either";
import { desc } from "drizzle-orm";

type ListLinksOutput = {
	id: string;
	shortUrl: string;
	originalUrl: string;
	accessCount: number;
};

export async function listLinks(): Promise<Either<never, ListLinksOutput[]>> {
	const links = await db
		.select({
			id: schema.links.id,
			shortUrl: schema.links.shortUrl,
			originalUrl: schema.links.originalUrl,
			accessCount: schema.links.accessCount,
		})
		.from(schema.links)
		.orderBy(desc(schema.links.createdAt))

	return makeRight(links);
}
