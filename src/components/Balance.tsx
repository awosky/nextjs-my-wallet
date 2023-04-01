import { Divider, Typography } from "antd";

import style from "./Balance.module.scss";

const Balance = () => {
  return (
    <div className={style.balance}>
      <Typography.Title className={style.text} level={5}>
        Total Balance
      </Typography.Title>
      <Typography.Title className={style.value} level={2}>
        Rp.7,000,000
      </Typography.Title>
      <Divider className={style.divider} />
    </div>
  );
};

export default Balance;
