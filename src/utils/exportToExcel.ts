import dayjs from "dayjs";
import ExcelJS from "exceljs";

import { CATEGORY_PROPERTIES } from "@/constants/global";

import { getTotalAmountByCategory, getTotalExpense, getTotalIncome, getTransactions } from "./storage";

export const exportTransactionsToExcel = async (): Promise<void> => {
  const workbook = new ExcelJS.Workbook();

  const summarySheet = workbook.addWorksheet("Transaction Summary");
  summarySheet.columns = [
    { header: "Description", key: "description", width: 25 },
    { header: "Amount", key: "amount", width: 18 },
  ];
  summarySheet.getRow(1).font = { bold: true };
  summarySheet.addRow({
    description: "Total Income",
    amount: getTotalIncome(),
  });
  summarySheet.addRow({
    description: "Total Expense",
    amount: getTotalExpense(),
  });
  summarySheet.addRow({});
  const categoryHeaderRow = summarySheet.addRow({
    description: "Description",
    amount: "Amount",
  });
  categoryHeaderRow.font = { bold: true };
  Object.keys(CATEGORY_PROPERTIES).forEach((category) => {
    const amount = getTotalAmountByCategory(category);
    summarySheet.addRow({
      description: category,
      amount,
    });
  });
  summarySheet.getColumn("amount").numFmt = "#,##0.00";

  const detailsSheet = workbook.addWorksheet("Transaction Details");
  detailsSheet.columns = [
    { header: "Date", key: "date", width: 18 },
    { header: "Category", key: "category", width: 20 },
    { header: "Description", key: "description", width: 30 },
    { header: "Amount", key: "amount", width: 18 },
  ];
  detailsSheet.getRow(1).font = { bold: true };
  detailsSheet.autoFilter = { from: "A1", to: "E1" };
  getTransactions("ASC").forEach((t) => {
    const row = detailsSheet.addRow({
      date: dayjs(t.date).toDate(),
      category: t.category,
      description: t.description,
      amount: t.amount,
    });
    const amountCell = row.getCell("amount");
    amountCell.numFmt = "#,##0.00";
    if (t.type === "income") {
      amountCell.font = { color: { argb: "FF2E7D32" }, bold: true };
    }
    if (t.type === "expense") {
      amountCell.font = { color: { argb: "FFC62828" }, bold: true };
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const today = dayjs().format("YYYY-MM-DD");
  const fileName = `My Wallet Transactions ${today}.xlsx`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};
