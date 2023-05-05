import * as AntdIcons from "@ant-design/icons";
import { Avatar, List, Space, Typography } from "antd";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";

import TransactionMenu from "@/components/TransactionMenu";
import { CATEGOTY_PROPERTIES } from "@/constants/global";
import { formatCurrency } from "@/utils/formatter";

import style from "./Transaction.module.scss";

interface Props {
  dates: [];
  data: [];
}

const Transaction = (props: Props) => {
  const { dates: syncDates, data: syncData } = props;
  const [dates, setDates] = useState<any>(syncDates || []);
  const [data, setData] = useState<any>(syncData || []);

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
      <Typography.Title level={4}>Transactions</Typography.Title>
      {dates.length > 0 ? (
        dates.map((v: any) => {
          return (
            <Fragment key={v}>
              <Typography.Paragraph className={style.date}>
                {v}
              </Typography.Paragraph>
              <List
                dataSource={data.filter((d: any) => d.date === v)}
                renderItem={(item: any, i: number) => (
                  <List.Item key={i}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: (CATEGOTY_PROPERTIES as any)[
                              item.category
                            ]?.color,
                          }}
                          icon={getIcon(
                            (CATEGOTY_PROPERTIES as any)[item.category]?.icon
                          )}
                        />
                      }
                      title={item.category}
                      description={item.description || "-"}
                    />
                    <Space direction="vertical" size={0} align="end">
                      <TransactionMenu item={item} />
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

export default Transaction;
