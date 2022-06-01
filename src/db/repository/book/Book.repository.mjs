import { throwHttpGraphQLError } from 'apollo-server-core/dist/runHttpQuery';
import bookModel from './Book.model.mjs';

class BookRepository {
  constructor() {
    this.model = bookModel;
  }

  async getAll(fields) {
    return await this.model
      .find()
      .select(fields[0])
      .populate('authors', fields[1])
      .exec();
  }

  async getById(id, fields) {
    return await this.model
      .findById(id)
      .select(fields[0])
      .populate('authors', fields[1])
      .exec();
  }

  async getByFilter(filter) {
    return await this.model.find(filter);
  }

  async create(book) {
    return await this.model.create(book);
  }

  async update(id, bookInput, fields) {
    return await this.model
      .findByIdAndUpdate(id, bookInput, { new: true })
      .select(fields[0])
      .populate('authors', fields[1])
      .exec();
  }

  async delete(id, fields) {
    return await this.model
      .findByIdAndRemove(id)
      .select(fields[0])
      .populate('authors', fields[1])
      .exec();
  }

  async addAuthorsToBook(bookId, authorsIdArray, fields) {
    const book = await this.model.findById(bookId);
    if (!book) {
      // à tester
      throwHttpGraphQLError(404, ['Book not found']);
    }
    book.authors.push(...authorsIdArray);
    await book.save();
    return await book.populate('authors', fields[1]);
  }

  async removeAuthorsFromBook(bookId, authorsIdArray, fields) {
    const book = await this.model.findById(bookId);
    if (!book) {
      // à tester
      throwHttpGraphQLError(404, ['Book not found']);
    }
    console.log(authorsIdArray);
    book.authors = book.authors.filter(
      author => !authorsIdArray.includes(author.toString())
    );
    await book.save();
    return await book.populate('authors', fields[1]);
  }
}

export default BookRepository;
