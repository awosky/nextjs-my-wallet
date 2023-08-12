import {
  DeleteOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import { useContext } from "react";

import { SyncContext } from "@/providers/SyncProvider";
import { deleteAllTransaction } from "@/utils/storage";

import style from "./TransactionMenu.module.scss";

const TransactionMenu = () => {
  const { setSync } = useContext(SyncContext);

  const menuItems = [
    {
      key: "clear",
      label: "Clear all transactions",
      icon: <DeleteOutlined />,
      onClick: () => {
        Modal.confirm({
          centered: true,
          title: "Are you sure you want to delete all transactions?",
          icon: <ExclamationCircleFilled />,
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk() {
            deleteAllTransaction();
            setSync(false);
          },
        });
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Button
        className={style.menu}
        type="text"
        size="small"
        icon={<MoreOutlined />}
      />
    </Dropdown>
  );
};

export default TransactionMenu;
