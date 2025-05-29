import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from 'drizzle-orm';
import { z } from "zod";
import { EntryAlreadyExists } from "./errors/entry-already-exists";

const createLinkInput = z.object({
	shortUrl: z.string(),
	originalUrl: z.string().url(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;
type CreateLinkOutput = {
	id: string;
	shortUrl: string;
	originalUrl: string;
	accessCount: number;
};

export async function createLink(
	input: CreateLinkInput,
): Promise<Either<EntryAlreadyExists, CreateLinkOutput>> {
	const { shortUrl, originalUrl } = createLinkInput.parse(input);

	// Check if shortUrl already exists
	const existingLink = await db
		.select({ id: schema.links.id })
		.from(schema.links)
		.where(eq(schema.links.shortUrl, shortUrl))
		.limit(1);

	if (existingLink.length) {
		return makeLeft(new EntryAlreadyExists());
	}

	const [newLink] = await db
		.insert(schema.links)
		.values({
			id: crypto.randomUUID(),
			shortUrl,
			originalUrl,
			createdAt: new Date(),
		})
		.returning({
			id: schema.links.id,
			shortUrl: schema.links.shortUrl,
			originalUrl: schema.links.originalUrl,
			accessCount: schema.links.accessCount,
		});

	return makeRight(newLink);
}
