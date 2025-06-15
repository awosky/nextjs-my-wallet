import { useEffect, useState } from "react";

import { Transaction } from "@/utils/storage";

import BarChart from "./BarChart";
import style from "./Chart.module.scss";
import ChartMenu from "./ChartMenu";
import PieChart from "./PieChart";

interface Props {
  expenses: Transaction[];
}

const Chart = (props: Props) => {
  const pieChart = "pieChart";
  const barChart = "barChart";
  const { expenses } = props;
  const [type, setType] = useState<string>(pieChart);

  useEffect(() => {
    if (expenses.length == 0) setType(pieChart);
  }, [expenses]);

  return (
    <>
      <div className={style.chart}>
        {expenses.length > 0 && <ChartMenu type={type} pieChart={pieChart} barChart={barChart} setType={setType} />}
        {type == pieChart ? <PieChart expense={expenses} /> : <BarChart expense={expenses} />}
      </div>
    </>
  );
};

export default Chart;
