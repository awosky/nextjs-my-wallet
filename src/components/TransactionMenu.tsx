import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";
import { useContext, useState } from "react";

import ModalForm from "@/components/ModalForm";
import { SyncContext } from "@/providers/SyncProvider";
import { deleteTransaction } from "@/utils/storage";

import style from "./TransactionMenu.module.scss";

interface Props {
  item: any;
}

const TransactionMenu = (props: Props) => {
  const { item } = props;
  const { setSync } = useContext(SyncContext);
  const [open, setOpen] = useState(false);

  const items = [
    {
      key: "1",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => {
        setOpen(true);
      },
    },
    {
      key: "2",
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: () => {
        Modal.confirm({
          centered: true,
          title: "Are you sure delete this transaction?",
          icon: <ExclamationCircleFilled />,
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          onOk() {
            deleteTransaction(item.id);
            setSync(false);
          },
        });
      },
    },
  ];

  return (
    <div className={style.menu}>
      <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
        <Button
          className={style.more}
          type="text"
          size="small"
          icon={<MoreOutlined />}
        />
      </Dropdown>
      <ModalForm open={open} setOpen={setOpen} item={item} />
    </div>
  );
};

export default TransactionMenu;
