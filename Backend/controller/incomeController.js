import { deleteUploadedFile } from "../middleware/auth.js";
import Income from "../models/incomeModel.js";

export const addIncome = async (req, res) => {
    const proof = req.file;

  try {
    const { amount, category, source, description, date } = req.body;
      if (!amount || !category || !source || !date) {
      return res.status(400).json({ error: "Required fields are missing." });
    }
    const income = await Income.create({ 
      amount,
      category,
      source,
      description,
      date,
      proof:proof?.filename,
    });

    res.status(201).json({ message: "Income added successfully", income });
  } 
  catch (error) {
    await deleteUploadedFile(proof); 
    console.error("--- Error adding income ---", error);
    res.status(500).json({ error: "Server error. Could not add income." });
  }
};

export const getAll = async (req, res) => {
    try {
      const incomes = await Income.findAll();
      res.status(200).json(incomes);
    } catch (error) {
      console.error("Error fetching incomes:", error);
      res.status(500).json({ error: "Server error. Could not fetch incomes." });
    }
  };
  
