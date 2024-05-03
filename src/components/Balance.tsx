import { FireOutlined, RiseOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row, Statistic } from "antd";

import { formatCurrency } from "@/utils/formatter";

import style from "./Balance.module.scss";

interface Props {
  income: number;
  balance: number;
}

const Balance = (props: Props) => {
  const { income = 0, balance = 0 } = props;

  return (
    <div className={style.balance}>
      <Row>
        <Col span={12}>
          <Card className={style.card}>
            <Statistic className={style.income} title="Total Income" value={formatCurrency(income, true)} prefix={<RiseOutlined />} />
          </Card>
        </Col>
        <Col span={12}>
          <Card className={style.card}>
            <Statistic title="Available Balance" value={formatCurrency(balance, true)} prefix={<FireOutlined />} />
          </Card>
        </Col>
      </Row>
      <Divider className={style.divider} />
    </div>
  );
};

export default Balance;
