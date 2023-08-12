import dayjs from "dayjs";

export interface Transaction {
  id: string | number;
  type: string;
  date: string;
  category: string;
  description: string;
  amount: string | number;
}

export const saveTransaction = (newTransaction: Transaction) => {
  localStorage.setItem(
    "transactions",
    JSON.stringify([...getTransactions(), newTransaction])
  );
};

export const editTransaction = (newTransaction: Transaction) => {
  const data = getTransactions();
  const newData = data.map((v: Transaction) => {
    return v.id === newTransaction.id ? newTransaction : v;
  });
  localStorage.setItem("transactions", JSON.stringify(newData));
};

export const deleteTransaction = (id: string | number) => {
  const data = getTransactions();
  const newData = data.filter((v: Transaction) => v.id !== id);
  localStorage.setItem("transactions", JSON.stringify(newData));
};

export const deleteAllTransaction = () => {
  localStorage.removeItem("transactions");
};

export const getTransactions = () => {
  const data = localStorage.getItem("transactions");
  return data ? JSON.parse(data) : [];
};

export const getDates = () => {
  const dates = new Set();
  getTransactions().map((v: any) => dates.add(v.date));
  const arrayDates = Array.from(dates);
  arrayDates.sort((a: any, b: any) => dayjs(b).diff(dayjs(a)));
  return arrayDates ? arrayDates : [];
};

export const getTotalBalance = () => {
  return (
    getTransactions()?.reduce((v: any, t: any) => {
      if (t.type === "income") return v + t.amount;
      return v - t.amount;
    }, 0) || 0
  );
};

export const getFilteredExpense = () => {
  return getTransactions()
    ?.filter((v: any) => v.type === "expense")
    ?.reduce((a: any, v: any) => {
      if (a.find((a1: any) => a1.category === v.category)) {
        return a.map((a2: any) =>
          a2.category === v.category
            ? { category: v.category, value: a2.value + v.amount }
            : a2
        );
      }
      return [
        ...a,
        {
          category: v.category,
          value: v.amount,
        },
      ];
    }, []);
};
