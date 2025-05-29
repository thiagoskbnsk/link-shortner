import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { exportLinksRoute } from "./routes/export-links";
import { getOriginalUrlRoute } from "./routes/get-original-url";
import { listLinksRoute } from "./routes/list-links";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.code(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	console.error(error);

	return reply.code(500).send({ message: "Internal server error" });
});

server.register(fastifyCors, { origin: "*" });
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Link Server",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.register(createLinkRoute);
server.register(deleteLinkRoute);
server.register(getOriginalUrlRoute);
server.register(listLinksRoute);
server.register(exportLinksRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("Server is running on port 3333: http://localhost:3333");
});
