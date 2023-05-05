import { Spin } from "antd";

import style from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={style.loading}>
      <Spin />
    </div>
  );
};

export default Loading;
