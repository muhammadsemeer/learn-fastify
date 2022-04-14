const uuid = require("uuid");

const item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

const opts = {
  getItems: {
    schema: {
      response: {
        200: {
          type: "array",
          items: item,
        },
      },
    },
  },
  getItemsById: {
    schema: {
      response: {
        200: item,
      },
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
  },
  postItems: {
    schema: {
      response: {
        201: item,
      },
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
        },
      },
    },
  },
  deleteItems: {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
  },
};

let items = [
  {
    id: "1",
    name: "item 1",
  },
  {
    id: "2",
    name: "item 2",
  },
  {
    id: "3",
    name: "item 3",
  },
];

const routes = (fastify, options, done) => {
  fastify.get("/items", opts.getItems, (request, reply) => {
    reply.send(items);
  });

  fastify.get("/items/:id", opts.getItemsById, (request, reply) => {
    const { id } = request.params;
    reply.send(items.find((item) => item.id === id) || {});
  });

  fastify.post("/items", opts.postItems, (request, reply) => {
    const { name } = request.body;
    const item = { id: uuid.v4(), name };
    items.push(item);
    reply.code(201).send(item);
  });

  fastify.delete("/items/:id", opts.deleteItems, (request, reply) => {
    const { id } = request.params;
    items = items.filter((item) => item.id !== id);
    reply.send({ message: `Item ${id} deleted` });
  });

  done();
};

module.exports = routes;
