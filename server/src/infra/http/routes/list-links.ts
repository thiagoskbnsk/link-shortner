import { listLinks } from "@/app/functions/list-links";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const listLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links",
		{
			schema: {
				summary: "List all links",
				tags: ["links"],
				response: {
					200: z.array(z.object({
						id: z.string(),
						shortUrl: z.string(),
						originalUrl: z.string(),
						accessCount: z.number(),
					})),
					500: z.object({ message: z.string() }).describe('Internal server error'),
				},
			},
		},
		async (_, reply) => {
			const result = await listLinks();

			if (isRight(result)) {
				const links = unwrapEither(result);

				return reply.status(200).send(links);
			}

			return reply.status(500).send({ message: "Internal server error" });
		},
	);
};
