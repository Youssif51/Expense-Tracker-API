const express = require("express");
const router = express.Router();
const {
  postExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const { authenticateUser } = require("../middlewares/authMiddlewares");

router.post("/", authenticateUser, postExpense);
router.get("/", authenticateUser, getExpense);
router.put("/:id", authenticateUser, updateExpense);
router.delete("/:id", authenticateUser, deleteExpense);

module.exports = router;
