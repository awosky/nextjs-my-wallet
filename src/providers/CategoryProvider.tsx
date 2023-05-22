import { createContext, useMemo, useState } from "react";

export const defaultCategory = "Total Expense";

export const CategoryContext = createContext<any>({
  category: defaultCategory,
  setCategory: () => null,
});

const CategoryProvider = ({ children }: { children: JSX.Element }) => {
  const [category, setCategory] = useState<string>(defaultCategory);
  const value = useMemo(() => ({ category, setCategory }), [category]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
