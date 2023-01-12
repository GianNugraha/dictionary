const {
  Loan,
} = require("../../../models");

class LoanRepository {
  static async addLoan(tempData) {
    try {
      let respData = [];
      for (let i = 0; i < tempData.length; i++) {
        const loan = await Loan.create(
          tempData[i]
        );
        respData.push(loan);
      }
      return respData;
    } catch (error) {
      throw error;
    }
  }

  static async getLoanById(whr) {
    try {
      const data = await Loan.findOne({
        where: { id: whr },
      });
      if (data == null) throw new Error("Loan Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getStatusLoan(BookId, UserId) {
    try {
      const data = await Loan.findOne({
        where: { BookId, UserId },
      });
      if (data == null) throw new Error("Loan with ID book "+BookId+" Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllLoan(whr) {
    try {
      const data = await Loan.findAll({
        order: [["created_at", "DESC"]],
        where: {UserId:whr}
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getLateReturn(whr) {
    try {
      const data = await Loan.findAll({
        where: { UserId: whr },
      });
      if (data == null) throw new Error("Loan Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  static async deleteLoan(BookId, UserId) {
    try {
      return await Loan.destroy({
         where: {
          BookId, UserId
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getLoanByIdUser(whr) {
    try {
      const data = await Loan.findAndCountAll({
        where: { UserId: whr },
      });
      if (data == null) throw new Error("Loan Not Found !");
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LoanRepository;
