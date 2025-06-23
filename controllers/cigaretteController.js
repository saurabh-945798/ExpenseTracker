const Cigarette = require("../models/Cigarette");

exports.addCigarette = async (req, res) => {
  try {
    const { name, cigaretteType, quantity, amount, paymentStatus } = req.body;
    const entry = new Cigarette({ name, cigaretteType, quantity, amount, paymentStatus });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error("Add Cigarette Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCigarettes = async (req, res) => {
  try {
    const all = await Cigarette.find().sort({ date: -1 });
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Fetch Error" });
  }
};

exports.deleteCigarette = async (req, res) => {
  try {
    await Cigarette.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed" });
  }
};
