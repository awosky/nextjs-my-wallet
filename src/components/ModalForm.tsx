import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
} from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";

import {
  EXPENSE_CATEGORY_OPTIONS,
  INCOME_CATEGORY_OPTIONS,
} from "@/constants/global";
import { SyncContext } from "@/providers/SyncProvider";
import { formatCurrency } from "@/utils/formatter";
import { editTransaction, saveTransaction } from "@/utils/storage";

import style from "./ModalForm.module.scss";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  item?: any;
}

const ModalForm = (props: Props) => {
  const { open, setOpen, item } = props;
  const [type, setType] = useState("income");
  const [form] = Form.useForm();
  const { setSync } = useContext(SyncContext);

  useEffect(() => {
    if (item && open) {
      form.setFieldsValue({
        Type: item.type,
        Date: dayjs(item.date),
        Category: item.category,
        Description: item.description || "",
        Amount: item.amount,
      });
    }
  }, [form, item, open]);

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onChangeType = (e: any) => {
    setType(e.target.value);
    form.setFieldValue("Category", null);
  };

  const onFinish = (v: any) => {
    const data = {
      id: item ? item.id : dayjs().unix(),
      type: v.Type,
      date: dayjs(v.Date).format("DD MMM YYYY"),
      category: v.Category,
      description: v.Description || "",
      amount: v.Amount,
    };
    item ? editTransaction(data) : saveTransaction(data);
    form.resetFields();
    setOpen(false);
    setSync(false);
  };

  return (
    <div>
      <Modal
        className={style.modal}
        title={`${item ? "Edit" : "Add"} Transaction`}
        open={open}
        onCancel={onCancel}
        footer={false}
        centered
      >
        <Form
          className={style.form}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item
            label="Type"
            name="Type"
            initialValue={type}
            rules={[{ required: true }]}
          >
            <Radio.Group
              buttonStyle="solid"
              onChange={onChangeType}
              className={style.type}
            >
              <Radio.Button value="income" className={style.button}>
                Income
              </Radio.Button>
              <Radio.Button
                value="expense"
                className={classNames(style.button, style.expense)}
              >
                Expense
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Date"
            name="Date"
            initialValue={dayjs()}
            rules={[{ required: true }]}
          >
            <DatePicker format="DD MMM YYYY" className={style.date} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="Category"
            rules={[{ required: true }]}
          >
            <Select
              options={
                type === "income"
                  ? INCOME_CATEGORY_OPTIONS
                  : EXPENSE_CATEGORY_OPTIONS
              }
              placeholder="Select Category"
              className={style.category}
            />
          </Form.Item>
          <Form.Item label="Description" name="Description">
            <Input placeholder="Add Description" />
          </Form.Item>
          <Form.Item label="Amount" name="Amount" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              formatter={(v) => formatCurrency(v)}
              parser={(v: any) => v?.replace(/\$\s?|(\.*)/g, "")}
              className={style.amount}
            />
          </Form.Item>
          <div className={style.submit}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalForm;
