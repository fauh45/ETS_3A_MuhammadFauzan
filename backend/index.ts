import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

import fastifyCors from "fastify-cors";
import fastifySwagger from "fastify-swagger";
import StaffController from "./controller/staff";

const app = fastify({
  logger: {
    prettyPrint: true,
    level: "debug",
  },
});

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const registerPlugins = async () => {
  // Decorate Fastify with prisma client
  const prisma = new PrismaClient();
  await prisma.$connect();

  app.decorate("prisma", prisma);

  app.addHook("onClose", async () => {
    await app.prisma.$disconnect();
  });

  // Add CORS Headers using CORS plugins
  app.register(fastifyCors, {
    origin: "*",
  });

  // Add Swagger Documentation plugins
  app.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "DVD Rental Backend",
        version: "0.1.0",
      },
      tags: [{ name: "Staff", description: "Staff CRUD APIs" }],
    },
  });

  await app.register(StaffController, { prefix: "/staff" });
};

registerPlugins()
  .then(() => app.listen(3000))
  .catch((err) => app.log.error(err));
