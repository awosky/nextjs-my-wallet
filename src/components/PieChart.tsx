import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";

import { CATEGOTY_PROPERTIES } from "@/constants/global";
import { formatCurrency } from "@/utils/formatter";

import style from "./PieChart.module.scss";

interface Props {
  expense: [];
}

const PieChart = (props: Props) => {
  const { expense } = props;
  const isExist = expense.length > 0;
  const initialData = isExist ? expense : [{ value: 0 }];
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (isExist) setData(expense);
  }, [expense, isExist]);

  const config = {
    data,
    colorField: "category",
    angleField: "value",
    color: ({ category }: any) =>
      (CATEGOTY_PROPERTIES as any)[category]?.color || "#6395F9",
    radius: 100,
    innerRadius: 0.6,
    statistic: {
      title: { content: "Total Expense", style: { fontSize: "14px" } },
      content: {
        style: { fontSize: "16px", marginTop: "4px" },
        customHtml: (_container: any, _: any, datum: any, data: any) => {
          const value = datum
            ? datum.value
            : data?.reduce((r: any, d: any) => r + d.value, 0);
          return formatCurrency(value, true);
        },
      },
    },
  };

  return (
    <div className={style.piechart}>
      <Pie
        {...config}
        tooltip={false}
        legend={{ position: "bottom", flipPage: false, itemSpacing: 10 }}
        interactions={[{ type: "element-selected", enable: false }]}
        label={
          data.length > 1
            ? { formatter: (data: any) => formatCurrency(data.value, true) }
            : false
        }
      />
    </div>
  );
};

export default PieChart;
