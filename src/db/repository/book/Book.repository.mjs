import bookModel from './Book.model.mjs'

class BookRepository {
  constructor() {
    this.model = bookModel;
  }

  async getAll() {
    return await this.model.find().populate('authors');
  }

  async getById(id) {
    return await this.model.findById(id).populate('authors');
  }

  async create(book) {
    return await this.model.create(book);
  }

  async update(id, bookInput) {
    return await this.model.findByIdAndUpdate(id, bookInput, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndRemove(id);
  }

  async addAuthorsToBook(bookId, authorsIdArray) {
    const book = await this.model.findById(bookId);
    if (!book) {
      return null;
    }
    book.authors.push(...authorsIdArray);
    await book.save();

    authorsIdArray.forEach(async authorId => {
      const author = new BookRepository();
      await author.addAuthorsToBook(authorId, [bookId]);
    });

    return await book.populate('authors');
  }

  async removeAuthorsFromBook(bookId, authorsIdArray) {
    const book = await this.model.findById(bookId);
    if (!book) {
      return null;
    }
    book.authors = book.authors.filter(author =>
      !authorsIdArray.includes(author.toString()));
      
    await book.save();
    return await book.populate('authors');
  }
}

export default BookRepository;