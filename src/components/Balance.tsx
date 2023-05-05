import { Divider, Typography } from "antd";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/utils/formatter";

import style from "./Balance.module.scss";

interface Props {
  balance: number;
}

const Balance = (props: Props) => {
  const { balance } = props;
  const [value, setValue] = useState(balance || 0);

  useEffect(() => {
    setValue(balance);
  }, [balance]);

  return (
    <div className={style.balance}>
      <Typography.Title className={style.text} level={5}>
        Available Balance
      </Typography.Title>
      <Typography.Title className={style.value} level={2}>
        {formatCurrency(value, true)}
      </Typography.Title>
      <Divider className={style.divider} />
    </div>
  );
};

export default Balance;
