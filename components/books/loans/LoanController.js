const LoanService = require('./LoanService');

class LoanController {
  static async addNewLoan(req, res, next) {
    try {
      const inputLoan = {
        BookId: req.body.BookId,
      };

      // input loan
      const newLoan = await LoanService.addLoan(
        inputLoan,
        req.user.id,
      );

      // const Loan = await LoanService.addLoan(req.body, req.user);
      res.status(201).json(newLoan);
    } catch (e) {
      next(e);
    }
  }

  static async getLoanById(req, res, next) {
    try {
      const { id } = req.params;
      const Loan = await LoanService.getLoanById(id)
      res.status(200).json(Loan);
    } catch (e) {
      next(e);
    }
  }

  static async getLoan(req, res, next) {
      try {
        const Loan = await LoanService.getAllLoan(req.user.id)
        res.status(200).json(Loan);
      } catch (e) {
        next(e);
      }
  }
}

module.exports = LoanController;
