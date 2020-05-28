import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

require('dotenv').config();

const prisma = new Prisma({
  typeDefs: './generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements,
});

export { prisma as default };
