import BookRepository from '../../db/repository/book/Book.repository.mjs';

const bookResolver = {
  Query: {
    books: () => new BookRepository().getAll(),
    book: (_, id ) => new BookRepository().getById(id),
  },

  Mutation: {
    createBook: (_, {input}) => new BookRepository().create(input),
    updateBook: (_, {_id, input}) => new BookRepository().update(_id, input),
    deleteBook: (_, _id) => new BookRepository().delete(_id),

    addAuthorsToBook: (_, {bookId, authorsIdArray}) => new BookRepository().addAuthorsToBook(bookId, authorsIdArray),
    removeAuthorsFromBook: (_, {bookId, authorsIdArray}) => new BookRepository().removeAuthorsFromBook(bookId, authorsIdArray),
  }
};

export default bookResolver;