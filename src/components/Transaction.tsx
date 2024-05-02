import * as AntdIcons from "@ant-design/icons";
import { Avatar, Col, List, Row, Space, Typography } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useEffect, useState } from "react";

import TransactionMenu from "@/components/TransactionMenu";
import TransactionMenuItem from "@/components/TransactionMenuItem";
import { CategoryProperties, CATEGOTY_PROPERTIES } from "@/constants/global";
import { CategoryContext, defaultCategory } from "@/providers/CategoryProvider";
import { formatCurrency } from "@/utils/formatter";
import { Transaction } from "@/utils/storage";

import style from "./Transaction.module.scss";

interface Props {
  dates: string[];
  data: Transaction[];
}

const Transactions = (props: Props) => {
  const { dates: syncDates, data: syncData } = props;
  const { category } = useContext(CategoryContext);
  const [dates, setDates] = useState<string[]>(syncDates || []);
  const [data, setData] = useState<Transaction[]>(syncData || []);
  const isDataExist = data.length > 0;

  useEffect(() => {
    setDates(syncDates);
    setData(syncData);
  }, [syncData, syncDates]);

  const getIcon = (v: string) => {
    const AntdIcon = (AntdIcons as any)[v || "DollarOutlined"];
    return <AntdIcon />;
  };

  return (
    <div className={style.transaction}>
      <Row justify="space-between" align="middle" wrap={false}>
        <Col>
          <Typography.Title level={4}>Transactions</Typography.Title>
        </Col>
        <Col>{isDataExist && <TransactionMenu />}</Col>
      </Row>
      {isDataExist ? (
        dates.map((v) => {
          const filteredDataByDate = data.filter((d) => d.date === v);
          const filteredDataByDateAndCategory = filteredDataByDate.filter((d) => d.category === category);
          const dataSource = category === defaultCategory ? filteredDataByDate : filteredDataByDateAndCategory;

          if (dataSource.length == 0) return null;
          return (
            <Fragment key={v}>
              <Typography.Paragraph className={style.date}>{v}</Typography.Paragraph>
              <List
                dataSource={dataSource}
                renderItem={(item: Transaction, i: number) => (
                  <List.Item key={i}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: (CATEGOTY_PROPERTIES as CategoryProperties)[item.category]?.color,
                          }}
                          icon={getIcon((CATEGOTY_PROPERTIES as CategoryProperties)[item.category]?.icon)}
                        />
                      }
                      title={item.category}
                      description={item.description || "-"}
                    />
                    <Space direction="vertical" size={0} align="end">
                      <TransactionMenuItem item={item} />
                      <Typography.Text
                        className={classNames({
                          [style.income]: item.type === "income",
                          [style.expense]: item.type === "expense",
                        })}
                      >
                        {item.type === "income" ? "+" : "-"}
                        {formatCurrency(item.amount, true)}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Fragment>
          );
        })
      ) : (
        <List dataSource={[]} />
      )}
    </div>
  );
};

export default Transactions;
