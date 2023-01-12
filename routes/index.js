const express = require("express");
const router = express.Router();
const errorHandlers = require("../middlewares/errorHandlers");
const userRoutes = require("./user");
const bookRoutes = require("./book");
// const loanRoutes = require("./loan");


router.use("/api/login", userRoutes);
router.use("/api/member", userRoutes);
router.use("/api/book", bookRoutes);

router.use(errorHandlers);

module.exports = router;