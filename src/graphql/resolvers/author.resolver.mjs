import AuthorRepository from '../../db/repository/author/Author.repository.mjs';

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

    deleteAuthor: (_, _id) => new AuthorRepository().delete(_id),

    addBooksToAuthor: (_, { authorId, booksIdArray }) =>
      new AuthorRepository().addBookstoAuthor(authorId, booksIdArray),

    removeBooksFromAuthor: (_, { authorId, booksIdArray }) =>
      new AuthorRepository().removeBooksFromAuthor(authorId, booksIdArray),
  },
};

export default authorResolver;
