import { CheckCircleOutlined, CheckCircleTwoTone, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { Dispatch, SetStateAction } from "react";

import style from "./ChartMenu.module.scss";

interface Props {
  type: string;
  pieChart: string;
  barChart: string;
  setType: Dispatch<SetStateAction<string>>;
}
const ChartMenu = ({ type, pieChart, barChart, setType }: Props) => {
  const menuItems = [
    {
      key: pieChart,
      label: "Pie chart",
      icon: type == pieChart ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CheckCircleOutlined />,
      onClick: () => setType(pieChart),
    },
    {
      key: barChart,
      label: "Bar chart",
      icon: type == barChart ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CheckCircleOutlined />,
      onClick: () => setType(barChart),
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]}>
      <Button className={style.menu} type="text" size="small" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default ChartMenu;
