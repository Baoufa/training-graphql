import authorModel from './Author.model.mjs';
import BookRepository from '../book/Book.repository.mjs';

class AuthorRepository {
  constructor() {
    this.model = authorModel;
  }

  async getAll() {
    return await this.model.find().populate('books');
  }

  async getById(id) {
    return await this.model.findById(id).populate('books');
  }

  async create(author) {
    return await this.model.create(author);
  }

  async update(id, authorInput) {
    return await this.model.findByIdAndUpdate(id, authorInput, { new: true });
  }

  async delete(id) {
    
    return await this.model.findByIdAndRemove(id);
  }

  async addBookstoAuthor(authorId, booksIdArray) {
    const author = await this.model.findById(authorId);
    if (!author) {
      return null;
    }
    author.books.push(...booksIdArray);
    await author.save();

    booksIdArray.forEach(async bookId => {
      const book = new BookRepository();
      await book.addAuthorsToBook(bookId, [authorId]);
    });

    return await author.populate('books');
  }

  async removeBooksFromAuthor(authorId, booksIdArray) {
    const author = await this.model.findById(authorId);
    if (!author) {
      return null;
    }
    author.books = author.books.filter(book =>
      !booksIdArray.includes(book.toString()));

    await author.save();
    return await author.populate('books');
  }
}

export default AuthorRepository;
