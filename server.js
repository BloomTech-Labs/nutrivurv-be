import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';
// import isLoggedIn from './utils/getUserId.js';
import passport from 'passport'
import { buildContext } from 'graphql-passport'

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  // middlewares: [isLoggedIn],

  // context: (request, response) => ({   
  context(request) {
    const passportAuth = buildContext({ req: request.request, res: request.response })
    return {
      prisma,
      pubsub,
      request,
      passportAuth
    };
  },
  fragmentReplacements,
  passport
});

export { server as default };
