import { Pie } from "@ant-design/plots";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

import { CATEGORY_PROPERTIES, CategoryProperties } from "@/constants/global";
import { CategoryContext, defaultCategory } from "@/providers/CategoryProvider";
import { formatCurrency } from "@/utils/formatter";
import { Transaction } from "@/utils/storage";

import style from "./PieChart.module.scss";

interface Props {
  expense: Transaction[];
}

const PieChart = (props: Props) => {
  const expenseData = useMemo(() => props.expense.map((v) => ({ category: v.category, value: v.amount })), [props.expense]);
  const defaultData = useMemo(() => [{ value: 0 }], []);
  const initialData = useMemo(() => (expenseData.length > 0 ? expenseData : defaultData), [defaultData, expenseData]);
  const [data, setData] = useState(initialData);
  const { category, setCategory } = useContext(CategoryContext);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (expenseData.length > 0) {
      setData(expenseData);
    } else {
      setData(defaultData);
    }

    return () => setCategory(defaultCategory);
  }, [defaultData, expenseData, setCategory]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && chartRef.current) {
        try {
          chartRef.current.forceFit?.();
        } catch (e) {
          console.warn("Chart resize error:", e);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const config = {
    data,
    colorField: "category",
    angleField: "value",
    color: ({ category: categoryColor }: any) => {
      const emptyColor = "#EEEEEE";
      const elementColor = (CATEGORY_PROPERTIES as CategoryProperties)[categoryColor]?.color;
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
        style: { fontSize: "14px", marginTop: "4px" },
        customHtml: (_container: any, _: any, datum: any, data: any) => {
          const filterData = data?.filter((d: any) => d.category === category);
          const customData = category === defaultCategory ? data : filterData;
          const value = datum ? datum.value : customData?.reduce((r: any, d: any) => r + d.value, 0);
          return formatCurrency(value, true);
        },
      },
    },
  };

  return (
    <div className={style.piechart}>
      <Pie
        {...config}
        animation={{ appear: { animation: "fadeIn" } }}
        tooltip={false}
        legend={{ position: "bottom", flipPage: false, itemSpacing: 10 }}
        onReady={(chartInstance) => (chartRef.current = chartInstance)}
        interactions={[
          { type: "element-active" },
          {
            type: "element-selected",
            cfg: {
              start: [
                {
                  trigger: "element:click",
                  action: (v: any) => {
                    const value = v.event.data.data.category;
                    if (!!value) setCategory(value == category ? defaultCategory : value);
                  },
                },
              ],
            },
          },
          { type: "legend-filter", enable: false },
          { type: "legend-active", enable: false },
        ]}
        label={data.length > 1 ? { formatter: (data) => formatCurrency(data.value, true) } : false}
      />
    </div>
  );
};

export default PieChart;
