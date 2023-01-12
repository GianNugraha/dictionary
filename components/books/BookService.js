const BookRepository = require('../books/BookRepository');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const {
    Sequelize,
    sequelize
  } = require('../../models');
  const Op = Sequelize.Op;
class BookService {
  static async addBook(inputValues) {
    try {
      const data = {
        id: uuidv4(),
        ...inputValues,
        companyLogo:inputValues.fileUrl,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
     
      const Books = await BookRepository.addBook(data);
      return Books;
    } catch (error) {
      throw error;
    }
  }

  static async getAllBook() {
    return BookRepository.getAllBook();
  }

  static async getBookById(id){
    return BookRepository.getBookById(id);
  }

}

module.exports = BookService;
