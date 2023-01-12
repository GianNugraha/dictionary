const express = require("express");
const LoanController = require("../components/books/loans/LoanController");
const Auth = require("../middlewares/Auth");
const { authentication, authorization } = Auth;

const router = express.Router();

router.post("/",[authentication],LoanController.addNewLoan);
router.get("/all", [authentication], LoanController.getLoan);
router.get("/:id", [authentication], LoanController.getLoanById);

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
