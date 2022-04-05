import React from "react";
import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

export const DeleteModal = (fcn) => {
  const open = () => {
    confirm({
      title: "Are you sure you want to delete it?",
      icon: <CloseCircleOutlined />,
      okText: "Approve",
      okButtonProps: { className: "ant-btn ant-btn-danger" },
      onOk() {
        if (fcn) return fcn("Ok");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return <div>{open()}</div>;
};
