const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const expense = new Expense({ userId: req.user.id, title, amount, category, date });
  await expense.save();
  res.status(201).json(expense);
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(expenses);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: "Expense deleted" });
};
