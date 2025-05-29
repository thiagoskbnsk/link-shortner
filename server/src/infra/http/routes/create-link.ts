import { createLink } from "@/app/functions/create-link";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create a new link",
				tags: ["links"],
				body: z.object({
					shortUrl: z
						.string()
						.regex(/^[a-zA-Z0-9-]+$/, "Invalid shortUrl format") // Added validation
						.describe("Must contain only alphanumeric characters and hyphens, no spaces or special characters"),
					originalUrl: z.string().url(),
				}),
				response: {
					201: z.object({
						id: z.string(),
						shortUrl: z.string(),
						originalUrl: z.string(),
						accessCount: z.number().default(0),
					}),
					400: z.object({ message: z.string() }).describe('Bad request, invalid input'),
					403: z.object({ message: z.string() }).describe('Short URL already exists'),
					500: z.object({ message: z.string() }).describe('Internal server error'),
				},
			},
		},
		async (request, reply) => {
			const result = await createLink(request.body);

			if (isRight(result)) {
				const link = unwrapEither(result);

				return reply.status(201).send(link);
			}

			const error = unwrapEither(result);

			switch (error.constructor.name) {
				case "EntryAlreadyExists":
					return reply.status(403).send({ message: error.message });
				default:
					return reply.status(500).send({ message: "Internal server error" });
			}
		},
	);
};
