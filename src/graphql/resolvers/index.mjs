import { mergeResolvers } from '@graphql-tools/merge';
import eventResolver from './event.resolver.mjs';
import bookResolver from './book.resolver.mjs';
import authorResolver from './author.resolver.mjs';
import { resolvers as scalarResolvers } from 'graphql-scalars';

const resolvers = mergeResolvers([
  bookResolver,
  authorResolver,
  eventResolver,
  scalarResolvers,
]);

export default resolvers;
