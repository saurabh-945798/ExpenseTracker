const express = require("express");
const { addExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, addExpense);
router.get("/", auth, getExpenses);
router.delete("/:id", auth, deleteExpense);

module.exports = router;
