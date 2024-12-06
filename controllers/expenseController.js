const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const postExpense = async (req, res) => {
  const { amount, category, description } = req.body;

  try {
    const userId = req.user.id;
    const createExpense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        description,
        userId,
      },
    });

    res.status(201).json(createExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating expense" });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await prisma.expense.findMany({
      where: {
        userId, // جلب كل النفقات الخاصة بالمستخدم
      },
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving expenses" });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, description } = req.body;

  try {
    const userId = req.user.id; // الـ Middleware بيمرر المستخدم

    // التحقق من ملكية المستخدم للنفقة
    const expense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
    });

    if (!expense || expense.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this expense" });
    }

    const updatedExpense = await prisma.expense.update({
      where: {
        id: parseInt(id),
      },
      data: {
        amount: parseFloat(amount),
        category,
        description,
      },
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating expense" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user.id; // التحقق من المستخدم الحالي

    // التحقق من ملكية المستخدم للنفقة
    const existingExpense = await prisma.expense.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingExpense || existingExpense.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this expense" });
    }

    // حذف النفقة
    await prisma.expense.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting expense" });
  }
};

module.exports = { postExpense, getExpense, updateExpense, deleteExpense };
