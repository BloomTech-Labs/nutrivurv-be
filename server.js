import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';
import getUserId from './utils/getUserId.js';
import passport from 'passport'
import {buildContext} from 'graphql-passport'

const pubsub = new PubSub();


const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  middlewares: [getUserId],
  context: (request, response) => ({    
      pubsub: pubsub,
      prisma: prisma,
      request: request,
      authContext: buildContext(request, response)

  }),
  fragmentReplacements,
  passport
});

export { server as default };
