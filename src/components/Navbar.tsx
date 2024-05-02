import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import Image from "next/image";
import { useState } from "react";

import ModalForm from "./ModalForm";
import style from "./Navbar.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Row className={style.navbar} justify="space-between" align="middle" wrap={false}>
        <Col span={4}>
          <Image width={32} height={32} alt="logo" src="/images/logo.png" className={style.logo} />
        </Col>
        <Col span={16}>
          <Typography.Title level={1}> My Wallet </Typography.Title>
        </Col>
        <Col span={4}>
          <Button onClick={() => setOpen(true)} icon={<PlusCircleTwoTone twoToneColor={"#6395F9"} />} type="text" />
        </Col>
      </Row>
      <ModalForm open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
