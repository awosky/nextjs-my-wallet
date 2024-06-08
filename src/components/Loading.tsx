import { Spin } from "antd";

import style from "./Loading.module.scss";

interface Props {
  isLoading: boolean;
  children: any;
}

const Loading = (props: Props) => {
  const { isLoading, children } = props;

  return (
    <>
      {isLoading && (
        <div className={style.loading}>
          <Spin />
        </div>
      )}
      {children}
    </>
  );
};

export default Loading;
