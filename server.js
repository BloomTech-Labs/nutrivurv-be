import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';
import getUserId from './utils/getUserId.js';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  middlewares: [getUserId],
  context(request) {
    return {
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

export { server as default };
