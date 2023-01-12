const { Book } = require("../../models");
const moment = require("moment");

class BookRepository {
  static async addBook(inputValues) {
    try {
      return await Book.create(inputValues);
    } catch (error) {
      throw error;
    }
  }

  static async getStatusBook(whr) {
    try {
      const data = await Book.findOne({
        where: { id: whr, is_exist: true },
      });
      if (data == null) throw new Error("Book Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(tempData) {
    try {
      for (let i = 0; i < tempData.length; i++) {
        await Book.update(
          { isExist: "false" },
          {
            where: {
              id: tempData[i].BookId,
            },
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateExisting(id) {
    try {
      return await Book.update(
        { isExist: "true" },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getBookById(whr) {
    try {
      const data = await Book.findOne({
        where: { id: whr },
      });
      if (data == null) throw new Error("Book Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllBook() {
    try {
      const data = await Book.findAndCountAll({
        order: [["created_at", "DESC"]],
        where: { is_exist: true },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookRepository;
