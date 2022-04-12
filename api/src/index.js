const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const cors = require("cors");
const http = require("http");

const typeDefs = require("./types");
const { people } = require("./data");

let currentPeople = people;

const resolvers = {
  Query: {
    people: () => currentPeople,
  },
};

main();

async function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/api/restore", (_, res) => {
    currentPeople = people;
    res.sendStatus(200);
  });

  app.delete("/api/people", ({ body }, res) => {
    if (!body.id) {
      res.sendStatus(400);
      return;
    }

    const indexToDelete = currentPeople.findIndex(
      (person) => person.id === body.id
    );
    if (indexToDelete < 0) {
      res.sendStatus(404);
      return;
    } else {
      const [removed] = currentPeople.splice(indexToDelete, 1);
      return res.send(removed);
    }
  });

  app.patch("/api/people", ({ body }, res) => {
    console.log({ body });
    if (!body.id) {
      res.sendStatus(400);
      return;
    }

    const indexToDelete = currentPeople.findIndex(
      (person) => person.id === body.id
    );
    if (indexToDelete < 0) {
      res.sendStatus(404);
      return;
    } else {
      const { id, ...changes } = body;
      const updated = (currentPeople[indexToDelete] = {
        ...currentPeople[indexToDelete],
        ...changes,
      });
      console.log({ updated });
      return res.send(updated);
    }
  });

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise((resolve) => httpServer.listen({ port: 9000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`);
}
