import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schemas/typeDefs";
import { authResolvers } from "./resolvers/authResolvers";
import { userResolvers } from "./resolvers/userResolvers";
import { getUser } from "./middleware/auth";
import logger from "./utils/logger";

async function startServer() {
  const app = express();

  const resolvers = {
    Query: {
      ...userResolvers.Query,
    },
    Mutation: {
      ...authResolvers.Mutation,
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await getUser(req);
      return { user };
    },
    formatError: (error) => {
      logger.error(`GraphQL Error: ${error.message}`);
      return error;
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    logger.info(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) => {
  logger.error("❌ Server startup failed:", error);
});
