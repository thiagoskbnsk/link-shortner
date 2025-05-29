import { getOriginalUrl } from "@/app/functions/get-original-url";
import { incrementAccessCount } from "@/app/functions/increment-access-count";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links/:shortUrl",
		{
			schema: {
				summary: "Get original URL by shortened URL",
				tags: ["links"],
				params: z.object({
					shortUrl: z.string(),
				}),
				response: {
					200: z.object({
						originalUrl: z.string(),
					}),
					404: z.object({ message: z.string() }).describe("Link not found"),
					500: z.object({ message: z.string() }).describe("Internal server error"),
				},
			},
		},
		async (request, reply) => {
			const result = await getOriginalUrl(request.params.shortUrl);

			if (isRight(result)) {
				const link = unwrapEither(result);

				await incrementAccessCount(link.id);

				return reply.status(200).send({ originalUrl: link.originalUrl });
			}

			const error = unwrapEither(result);

			switch (error.constructor.name) {
				case "EntryNotFound":
					return reply.status(404).send({ message: error.message });
				default:
					return reply.status(500).send({ message: "Internal server error" });
			}
		},
	);
};
