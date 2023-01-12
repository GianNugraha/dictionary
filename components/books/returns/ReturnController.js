const ReturnService = require('./ReturnService');

class ReturnController {
  static async returnBook(req, res, next) {
    try {
      const inputReturn = {
        BookId: req.body.BookId,
      };

      // input Return
      const returnBook = await ReturnService.returnBook(
        inputReturn,
        req.user.id,
      );
      res.status(201).json(returnBook);
    } catch (e) {
      next(e);
    }
  }

  static async getReturnById(req, res, next) {
    try {
      const { id } = req.params;
      const Return = await ReturnService.getReturnById(id)
      res.status(200).json(Return);
    } catch (e) {
      next(e);
    }
  }

}

module.exports = ReturnController;
