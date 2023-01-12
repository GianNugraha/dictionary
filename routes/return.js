const express = require("express");
const ReturnController = require("../components/books/returns/ReturnController");
const Auth = require("../middlewares/Auth");
const { authentication, authorization } = Auth;

const router = express.Router();

router.post("/",[authentication],ReturnController.returnBook);
// router.get("/loan/all", [authentication], LoanController.getLoan);
// router.get("/loan/:id", [authentication], LoanController.getLoanById);

// router.patch(
//   "/:id",
//   [authentication, authorization],
//   LoanController.patchData
// );

// router.put(
//   "/:id",
//   [authentication, authorization],
//   LoanController.updateLoan
// );

// router.delete(
//   "/:id",
//   [authentication, authorization],
//   LoanController.deleteLoan
// );

module.exports = router;
