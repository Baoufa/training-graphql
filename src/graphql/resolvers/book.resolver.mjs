import BookRepository from '../../db/repository/book/Book.repository.mjs';
import AuthorRepository from '../../db/repository/author/Author.repository.mjs';
import { getFields } from '../libs/utilities.mjs';

const bookResolver = {
  Query: {
    books: (parent, args, context, info) => {
      const fields = getFields(info);
      return new BookRepository().getAll(fields);
    },

    book: (_, id, context, info) => {
      const fields = getFields(info);
      return new BookRepository().getById(id, fields);
    },
  },

  Mutation: {
    createBook: (_, { input }, context, info) => {
      return new BookRepository().create(input);
    },

    updateBook: (_, { _id, input }, context, info) => {
      const fields = getFields(info);
      return new BookRepository().update(_id, input, fields);
    },

    deleteBook: async (_, _id, context, info) => {
      const fields = getFields(info);
      const authorsArray = await new AuthorRepository().getByFilter(
        {
          books: _id,
        },
        fields
      );
      const authorsIdArray = authorsArray.map(author => author._id);
      await authorsIdArray.forEach(async authorId => {
        await new AuthorRepository().removeBooksFromAuthor(
          authorId,
          [_id._id],
          fields
        );
      });
      return await new BookRepository().delete(_id, fields);
    },

    addAuthorsToBook: async (_, { bookId, authorsIdArray }, context, info) => {
      const fields = getFields(info);
      await authorsIdArray.forEach(async authorId => {
        await new AuthorRepository().addBookstoAuthor(
          authorId,
          [bookId],
          fields
        );
      });
      return await new BookRepository().addAuthorsToBook(
        bookId,
        authorsIdArray,
        fields
      );
    },

    removeAuthorsFromBook: async (
      _,
      { bookId, authorsIdArray },
      context,
      info
    ) => {
      const fields = getFields(info);
      await authorsIdArray.forEach(async authorId => {
        await new AuthorRepository().removeBooksFromAuthor(
          authorId,
          [bookId],
          fields
        );
      });

      return await new BookRepository().removeAuthorsFromBook(
        bookId,
        authorsIdArray,
        fields
      );
    },
  },
};

export default bookResolver;
