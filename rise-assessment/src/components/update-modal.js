import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Input, Button, Space } from "antd";

const UpdateModal = ({ data, callback }) => {
  const [form] = Form.useForm();
  const [priorities, setPriorities] = useState([]);
  const [state, setState] = useState({});

  useEffect(() => {
    const priorities_ = JSON.parse(localStorage.getItem("priorities"));
    setPriorities(priorities_);
  }, []);
  useEffect(() => {
    setState(data);
  }, [data]);
  const response = (res) => {
    return callback(res);
  };
  return (
    <div>
      <Modal
        title="Job Edit"
        centered
        closable={false}
        visible={true}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="job" label="Job Name">
            <Input
              placeholder="Write a Job Name"
              disabled
              defaultValue={data?.name}
            />
          </Form.Item>
          <Form.Item
            label="Job Priority"
            name="priority"
            tooltip="This is a required field"
          >
            <Select
              placeholder="Choose"
              defaultValue={data?.priority?.id}
              style={{ color: priorities[state.priority?.id]?.color }}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  priority: priorities[e],
                }))
              }
            >
              {priorities.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button danger onClick={() => response()}>
                Cancel
              </Button>
              <Button type="primary" danger onClick={() => response(state)}>
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateModal;
