import { deleteLink } from "@/app/functions/delete-link";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/links/:id",
		{
			schema: {
				summary: "Delete a link",
				tags: ["links"],
				params: z.object({
					id: z.string(),
				}),
				response: {
					204: z.null(),
					404: z.object({ message: z.string() }).describe("Link not found"),
					500: z.object({ message: z.string() }).describe("Internal server error"),
				},
			},
		},
		async (request, reply) => {
			const result = await deleteLink(request.params.id);

			if (isRight(result)) {
				return reply.status(204).send();
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
