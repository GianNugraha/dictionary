const BookService = require('../books/BookService');

class BookController {
  static async addNewBooks(req, res, next) {
    try {
      const Book = await BookService.addBook(req.body);
      res.status(201).json(Book);
    } catch (e) {
      next(e);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const Book = await BookService.getBookById(id)
      res.status(200).json(Book);
    } catch (e) {
      next(e);
    }
  }

  static async getBook(req, res, next) {
      try {
        const Book = await BookService.getAllBook()
        res.status(200).json(Book);
      } catch (e) {
        next(e);
      }
  }
}

module.exports = BookController;
