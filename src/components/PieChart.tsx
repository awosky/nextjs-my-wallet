import { Pie } from "@ant-design/plots";
import { useContext, useEffect, useState } from "react";

import { CATEGOTY_PROPERTIES } from "@/constants/global";
import { CategoryContext, defaultCategory } from "@/providers/CategoryProvider";
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
  const { category, setCategory } = useContext(CategoryContext);

  useEffect(() => {
    if (isExist) setData(expense);
  }, [expense, isExist]);

  const config = {
    data,
    colorField: "category",
    angleField: "value",
    color: ({ category: categoryColor }: any) => {
      const emptyColor = "#EEEEEE";
      const elementColor = (CATEGOTY_PROPERTIES as any)[categoryColor]?.color;
      if (category !== defaultCategory) {
        return categoryColor === category ? elementColor : emptyColor;
      } else {
        return elementColor || emptyColor;
      }
    },
    radius: 100,
    innerRadius: 0.6,
    statistic: {
      title: { content: category, style: { fontSize: "14px" } },
      content: {
        style: { fontSize: "16px", marginTop: "4px" },
        customHtml: (_container: any, _: any, datum: any, data: any) => {
          const filterData = data?.filter((d: any) => d.category === category);
          const customData = category === defaultCategory ? data : filterData;
          const value = datum
            ? datum.value
            : customData?.reduce((r: any, d: any) => r + d.value, 0);
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
        interactions={[
          {
            type: "element-active",
          },
          {
            type: "element-selected",
            cfg: {
              start: [
                {
                  trigger: "element:click",
                  action: (v: any) => {
                    const value = v.event.data.data.category;
                    if (!!value)
                      setCategory(value == category ? defaultCategory : value);
                  },
                },
              ],
            },
          },
          {
            type: "legend-filter",
            enable: false,
          },
          {
            type: "legend-active",
            enable: false,
          },
        ]}
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
