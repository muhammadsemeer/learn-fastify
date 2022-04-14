const fastify = require("fastify")({
  logger: true,
  ignoreTrailingSlash: true,
});

fastify.register(require("fastify-swagger"), {
  routePrefix: "/docs",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Fastify API",
      description: "Fastify API",
      version: "1.0.0",
    },
  },
});
fastify.register(require("./router"));

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
