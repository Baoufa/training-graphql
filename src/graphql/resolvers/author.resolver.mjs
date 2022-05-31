import AuthorRepository from '../../db/repository/author/Author.repository.mjs';
import BookRepository from '../../db/repository/book/Book.repository.mjs';

const authorResolver = {
  Query: {
    authors: () => new AuthorRepository().getAll(),
    author: (_, id) => new AuthorRepository().getById(id),
  },

  Mutation: {
    createAuthor: (_, { input }) =>
      new AuthorRepository()
        .create(input)
        .then(res => res)
        .catch(err => {
          console.log(err);
          err;
        }),

    updateAuthor: (_, { _id, input }) =>
      new AuthorRepository().update(_id, input),

    deleteAuthor: async (_, _id) => {
      const booksArray = await new BookRepository().getByFilter({
        authors: _id,
      });
      const booksIdArray = booksArray.map(book => book._id);
      
      booksIdArray.forEach(async bookId => {
       await new BookRepository().removeAuthorsFromBook(bookId, [_id._id]);
      });
      return await new AuthorRepository().delete(_id);
    },

    addBooksToAuthor: async (_, { authorId, booksIdArray }) => {
      await booksIdArray.forEach(async bookId => {
        await new BookRepository().addAuthorsToBook(bookId, [authorId]);
      });
      return new AuthorRepository().addBookstoAuthor(authorId, booksIdArray);
    },

    removeBooksFromAuthor: async (_, { authorId, booksIdArray }) => {
      await booksIdArray.forEach(async bookId => {
        await new BookRepository().removeAuthorsFromBook(bookId, [authorId]);
      });

      return await new AuthorRepository().removeBooksFromAuthor(
        authorId,
        booksIdArray
      );
    },
  },
};

export default authorResolver;
