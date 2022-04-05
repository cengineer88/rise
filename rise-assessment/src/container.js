import React from "react";
import Header from "./components/header";
import CustomLayout from "./components/layout";
import useHeader from "./hooks/header";

const Container = () => {
  const { info, setInfo } = useHeader();
  return (
    <div>
      <Header info={info} setInfo={setInfo} />
      <CustomLayout setInfo={setInfo} />
    </div>
  );
};

export default Container;
