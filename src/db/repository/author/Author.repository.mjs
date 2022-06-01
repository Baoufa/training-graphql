import authorModel from './Author.model.mjs';

class AuthorRepository {
  constructor() {
    this.model = authorModel;
  }

  async getAll(fields) {
    return await this.model
      .find()
      .select(fields[0])
      .populate('books', fields[1])
      .exec();
  }

  async getById(id, fields) {
    return await this.model
      .findById(id)
      .select(fields[0])
      .populate('books', fields[1])
      .exec();
  }

  async getByFilter(filter) {
    return await this.model.find(filter);
  }

  async create(author) {
    return await this.model.create(author);
  }

  async update(id, authorInput) {
    return await this.model
      .findByIdAndUpdate(id, authorInput, { new: true })
      .select(fields[0])
      .populate('books', fields[1])
      .exec();
  }

  async delete(id) {
    return await this.model
      .findByIdAndRemove(id)
      .select(fields[0])
      .populate('books', fields[1])
      .exec();
  }

  async addBookstoAuthor(authorId, booksIdArray, fields) {
    const author = await this.model.findById(authorId);
    if (!author) {
      throwHttpGraphQLError(404, ['Author not found']);
    }
    author.books.push(...booksIdArray);
    await author.save();
    return await author.populate('books', fields[1]);
  }

  async removeBooksFromAuthor(authorId, booksIdArray, fields) {
    const author = await this.model.findById(authorId);
    if (!author) {
      throwHttpGraphQLError(404, ['Author not found']);
    }
    author.books = author.books.filter(
      book => !booksIdArray.includes(book.toString())
    );

    await author.save();
    return await author.populate('books', fields[1]);
  }
}

export default AuthorRepository;
