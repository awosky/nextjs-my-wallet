import { measureTextWidth, Pie } from "@ant-design/plots";

import style from "./PieChart.module.scss";

const PieChart = () => {
  function renderStatistic(containerWidth: number, text: string, style: any) {
    const { width: textWidth, height: textHeight } = measureTextWidth(
      text,
      style
    );
    const R = containerWidth / 2;
    let scale = 1;
    if (containerWidth < textWidth) {
      scale = Math.min(
        Math.sqrt(
          Math.abs(
            Math.pow(R, 2) /
              (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
          )
        ),
        1
      );
    }
    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
      scale < 1 ? 1 : "inherit"
    };">${text}</div>`;
  }

  const data = [
    {
      type: "Zakat",
      value: 27,
    },
    {
      type: "Family",
      value: 25,
    },
    {
      type: "Wallet",
      value: 18,
    },
    {
      type: "Investment",
      value: 15,
    },
    {
      type: "Financial Expense",
      value: 10,
    },
    {
      type: "Other",
      value: 5,
    },
  ];

  const config = {
    appendPadding: 40,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    meta: {
      value: {
        formatter: (v: number) => `Rp. ${v}`,
      },
    },
    statistic: {
      title: {
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : "Expenses";
          return renderStatistic(d, text, { fontSize: 28 });
        },
      },
      content: {
        style: { fontSize: "32px" },
        customHtml: (container: any, view: any, datum: any, data: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum
            ? `Rp.${datum.value}`
            : `Rp.${data.reduce((r: number, d: any) => r + d.value, 0)}`;
          return renderStatistic(width, text, { fontSize: 32 });
        },
      },
    },
  };
  return (
    <div className={style.piechart}>
      <Pie {...config} />
    </div>
  );
};

export default PieChart;
