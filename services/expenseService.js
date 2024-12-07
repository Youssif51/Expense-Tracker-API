const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const filterPastWeek = async (userId) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 7);

  return await prisma.expense.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: currentDate,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

const filterLastMonth = async (userId) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setMonth(currentDate.getMonth() - 1);

  return await prisma.expense.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: currentDate,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

const filterLastThreeMonths = async (userId) => {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setMonth(currentDate.getMonth() - 3);

  return await prisma.expense.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: currentDate,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

const filterCustomDates = async (userId, startDate, endDate) => {
  return await prisma.expense.findMany({
    where: {
      userId,
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

module.exports = {
  filterPastWeek,
  filterLastMonth,
  filterLastThreeMonths,
  filterCustomDates,
};
