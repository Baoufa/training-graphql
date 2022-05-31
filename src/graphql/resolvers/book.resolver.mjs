import BookRepository from '../../db/repository/book/Book.repository.mjs';
import AuthorRepository from '../../db/repository/author/Author.repository.mjs';

const bookResolver = {
  Query: {
    books: () => new BookRepository().getAll(),
    book: (_, id) => new BookRepository().getById(id),
  },

  Mutation: {
    createBook: (_, { input }) => new BookRepository().create(input),
    updateBook: (_, { _id, input }) => new BookRepository().update(_id, input),
    
    deleteBook: async (_, _id) => {
      const authorsArray = await new AuthorRepository().getByFilter({
        books: _id,
      });
      const authorsIdArray = authorsArray.map(author => author._id);
      await authorsIdArray.forEach(async authorId => {
        await new AuthorRepository().removeBooksFromAuthor(authorId, [_id._id]);
      });
      return await new BookRepository().delete(_id);
    },

    addAuthorsToBook: async (_, { bookId, authorsIdArray }) => {
      await authorsIdArray.forEach(async authorId => {
        await new AuthorRepository().addBookstoAuthor(authorId, [bookId]);
      });
      return await new BookRepository().addAuthorsToBook(
        bookId,
        authorsIdArray
      );
    },

    removeAuthorsFromBook: async (_, { bookId, authorsIdArray }) => {
      await authorsIdArray.forEach(async authorId => {
        await new AuthorRepository().removeBooksFromAuthor(authorId, [bookId]);
      });

      return await new BookRepository().removeAuthorsFromBook(
        bookId,
        authorsIdArray
      );
    },
  },
};

export default bookResolver;
