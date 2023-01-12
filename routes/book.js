const express = require("express");
const BookController = require("../components/books/BookController");
const loanRoutes = require('./loan');
const returnRoutes = require('./return');
const Auth = require("../middlewares/Auth");
const { authentication, authorization } = Auth;

const router = express.Router();

router.get(
  "/all",
  [authentication],
  BookController.getBook
);
router.get(
  "/:id",
  [authentication],
  BookController.getBookById
);


/* Loan / Borrow Books */
router.use('/loan', loanRoutes);

/*Return Books*/
router.use('/return', returnRoutes);


module.exports = router;
