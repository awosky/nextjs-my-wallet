import dayjs from "dayjs";

export interface Transaction {
  id: number;
  type: TransactionType;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export type Sort = "ASC" | "DESC";

type TransactionType = "expense" | "income";

export const saveTransaction = (newTransaction: Transaction) => {
  localStorage.setItem("transactions", JSON.stringify([...getTransactions(), newTransaction]));
};

export const editTransaction = (newTransaction: Transaction) => {
  const newData = getTransactions().map((v: Transaction) => {
    return v.id === newTransaction.id ? newTransaction : v;
  });
  localStorage.setItem("transactions", JSON.stringify(newData));
};

export const deleteTransaction = (id: string | number) => {
  const newData = getTransactions().filter((v: Transaction) => v.id !== id);
  localStorage.setItem("transactions", JSON.stringify(newData));
};

export const deleteAllTransaction = () => {
  localStorage.removeItem("transactions");
};

export const getTransactions = (sort: Sort = "DESC"): Transaction[] => {
  const transactionsData = localStorage.getItem("transactions");
  const transactions: Transaction[] = transactionsData ? JSON.parse(transactionsData) : [];
  return [...transactions].sort((a, b) => (sort === "ASC" ? a.id - b.id : b.id - a.id));
};

export const getDates = (): string[] => {
  const dates = new Set<string>(getTransactions().map((v: Transaction) => v.date));
  return Array.from(dates).sort((a: string, b: string) => dayjs(b).diff(dayjs(a)));
};

export const getTotalIncome = (): number => {
  return getTransactions().reduce((a, v) => (v.type === "income" ? a + v.amount : a), 0);
};

export const getTotalExpense = (): number => {
  return getTransactions().reduce((a, v) => (v.type === "expense" ? a + v.amount : a), 0);
};

export const getTotalBalance = (): number => {
  return getTransactions().reduce((a, v) => (v.type === "income" ? a + v.amount : a - v.amount), 0);
};

export const getExpenseTransactions = (): Transaction[] => {
  return getTransactions()
    .filter((v) => v.type === "expense")
    .reduce((a: Transaction[], v: Transaction) => {
      if (a.find((v1: Transaction) => v1.category === v.category)) {
        return a.map((v2: Transaction) => (v2.category === v.category ? { ...v2, amount: v2.amount + v.amount } : v2));
      } else {
        return [...a, { ...v, category: v.category, amount: v.amount }];
      }
    }, []);
};

export const getTotalAmountByCategory = (category: string): number => {
  return getTransactions()
    .filter((v) => v.category === category)
    .reduce((a, v) => a + v.amount, 0);
};
