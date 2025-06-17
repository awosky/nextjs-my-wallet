import { Bar } from "@ant-design/plots";
import { useEffect, useMemo, useState } from "react";

import { CategoryProperties, CATEGOTY_PROPERTIES } from "@/constants/global";
import { formatCurrency, formatNewLineToSpace, formatSpaceToNewLine } from "@/utils/formatter";
import { Transaction } from "@/utils/storage";

import style from "./BarChart.module.scss";

interface Props {
  expense: Transaction[];
}

const BarChart = (props: Props) => {
  const expenseData = useMemo(() => props.expense.map((v) => ({ category: formatSpaceToNewLine(v.category), value: v.amount })), [props.expense]);
  const defaultData = useMemo(() => [{ value: 0 }], []);
  const initialData = useMemo(() => (expenseData.length > 0 ? expenseData : defaultData), [defaultData, expenseData]);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (expenseData.length > 0) {
      setData(expenseData);
    } else {
      setData(defaultData);
    }
  }, [defaultData, expenseData]);

  const config = {
    data,
    xField: "value",
    yField: "category",
  };

  return (
    <div className={style.barchart}>
      <Bar
        {...config}
        label={{
          formatter: (d) => formatCurrency(d.value, true),
          position: (d) => {
            const max = Math.max(...data.map((obj) => obj.value)) / 2;
            return d.value < max ? "right" : "middle";
          },
        }}
        tooltip={false}
        xAxis={false}
        color={(d) => (CATEGOTY_PROPERTIES as CategoryProperties)[formatNewLineToSpace(d.category)]?.color}
        maxBarWidth={24}
        style={{
          padding: "16px",
        }}
      />
    </div>
  );
};

export default BarChart;
