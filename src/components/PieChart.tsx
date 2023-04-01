import { Pie } from "@ant-design/plots";

import style from "./PieChart.module.scss";

const PieChart = () => {
  const formatter = new Intl.NumberFormat("en-US");

  const data = [
    {
      category: "Zakat",
      value: 27000,
    },
    {
      category: "Family",
      value: 25000,
    },
    {
      category: "Wallet",
      value: 18000,
    },
    {
      category: "Investment",
      value: 15000,
    },
    {
      category: "Financial Expense",
      value: 10000,
    },
    {
      category: "Other",
      value: 5000,
    },
  ];

  const config = {
    data,
    colorField: "category",
    angleField: "value",
    radius: 100,
    innerRadius: 0.6,
    tooltip: {
      formatter: (data: any) => ({
        name: `${data.category} `,
        value: `Rp.${formatter.format(data.value)}`,
      }),
    },
    label: { formatter: (data: any) => `Rp.${formatter.format(data.value)}` },
    statistic: {
      title: { content: "Total Expense", style: { fontSize: "14px" } },
      content: {
        style: { fontSize: "16px", marginTop: "4px" },
        customHtml: (_container: any, _: any, datum: any, data: any) => {
          const value = datum
            ? datum.value
            : data?.reduce((r: any, d: any) => r + d.value, 0);
          return `Rp.${formatter.format(value)}`;
        },
      },
    },
  };

  return (
    <div className={style.piechart}>
      <Pie
        {...config}
        legend={{ position: "bottom", flipPage: false, itemSpacing: 10 }}
      />
    </div>
  );
};

export default PieChart;
