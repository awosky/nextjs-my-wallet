import { MenuOutlined, PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

import style from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <Row
      className={style.navbar}
      justify="space-between"
      align="middle"
      wrap={false}
    >
      <Col span={4}>
        <Button
          icon={<MenuOutlined style={{ color: "#6276E9" }} />}
          type="text"
        />
      </Col>
      <Col span={16}>My Wallet</Col>
      <Col span={4}>
        <Button
          icon={<PlusCircleTwoTone twoToneColor={"#6276E9"} />}
          type="text"
        />
      </Col>
    </Row>
  );
};

export default Navbar;
