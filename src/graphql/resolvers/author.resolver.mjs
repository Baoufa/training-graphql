import AuthorRepository from '../../db/repository/author/Author.repository.mjs';
import BookRepository from '../../db/repository/book/Book.repository.mjs';
import { getFields } from '../libs/utilities.mjs';

const authorResolver = {
  Query: {
    authors: (parent, args, context, info) => {
      const fields = getFields(info);
      return new AuthorRepository().getAll(fields);
    },
    author: (_, id, context, info) => {
      const fields = getFields(info);
      return new AuthorRepository().getById(id, fields);
    },
  },

  Mutation: {
    createAuthor: (_, { input }) => new AuthorRepository().create(input),

    updateAuthor: (_, { _id, input }, context, info) => {
      const fields = getFields(info);
      return new AuthorRepository().update(_id, input, fields);
    },

    deleteAuthor: async (_, _id, context, info) => {
      const fields = getFields(info);
      const booksArray = await new BookRepository().getByFilter(
        {
          authors: _id,
        },
        fields
      );
      const booksIdArray = booksArray.map(book => book._id);
      await booksIdArray.forEach(async bookId => {
        await new BookRepository().removeAuthorsFromBook(
          bookId,
          [_id._id],
          fields
        );
      });
      return await new AuthorRepository().delete(_id, fields);
    },

    addBooksToAuthor: async (_, { authorId, booksIdArray }, context, info) => {
      const fields = getFields(info);
      await booksIdArray.forEach(async bookId => {
        await new BookRepository().addAuthorsToBook(bookId, [authorId], fields);
      });
      return new AuthorRepository().addBookstoAuthor(
        authorId,
        booksIdArray,
        fields
      );
    },

    removeBooksFromAuthor: async (
      _,
      { authorId, booksIdArray },
      context,
      info
    ) => {
      const fields = getFields(info);
      await booksIdArray.forEach(async bookId => {
        await new BookRepository().removeAuthorsFromBook(
          bookId,
          [authorId],
          fields
        );
      });

      return await new AuthorRepository().removeBooksFromAuthor(
        authorId,
        booksIdArray,
        fields
      );
    },
  },
};

export default authorResolver;
