import dayjs from "dayjs";
import * as XLSX from "xlsx";

import { CATEGORY_PROPERTIES } from "@/constants/global";

import { getTotalAmountByCategory, getTotalExpense, getTotalIncome, getTransactions } from "./storage";

export const exportTransactionsToExcel = (): void => {
  const worksheetData: (string | number)[][] = [
    ["Description", "Amount"],
    ["Total Income", getTotalIncome()],
    ["Total Expense", getTotalExpense()],
    [],
    ["Description", "Amount"],
    ...Object.keys(CATEGORY_PROPERTIES).map((category) => [category, getTotalAmountByCategory(category)]),
  ];

  const summaryWorksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);

  const transactionsWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
    getTransactions("ASC").map((t) => ({
      Date: t.date,
      Type: t.type,
      Category: t.category,
      Description: t.description,
      Amount: t.amount,
    }))
  );

  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Transaction Summary");
  XLSX.utils.book_append_sheet(workbook, transactionsWorksheet, "Transaction Details");

  const today = dayjs().format("YYYY-MM-DD");
  const fileName = `My Wallet Transactions ${today}.xlsx`;

  XLSX.writeFile(workbook, fileName);
};
