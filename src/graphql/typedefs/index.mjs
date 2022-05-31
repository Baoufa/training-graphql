import { loadFilesSync } from '@graphql-tools/load-files';
// import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';

import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
// import {print} from 'graphql';

const typesArray = loadFilesSync('.', {
  extensions: ['.graphql'],
  recursive: true,
});

const typeDefs = mergeTypeDefs([typesArray, scalarTypeDefs]);
// const typeDefs = makeExecutableSchema({typesArray, scalarTypeDefs});
// const printedTypeDefs = print(typeDefs);
// console.log(printedTypeDefs);

export default typeDefs;
