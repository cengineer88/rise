import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { Row, Col } from "antd";
import { getData } from "../api/api";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addJob } from "../actions/job-list-actions";

const CreateJob = ({ addData }) => {
  const [form] = Form.useForm();
  const [priorities, setPriorities] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState({});

  useEffect(() => {
    getPriorities("priorities");
  }, []);

  const getPriorities = async (value) => {
    const result = await getData(value);
    if (result.status === 200) {
      setPriorities(result.data);
      localStorage.setItem("priorities", JSON.stringify(result.data));
    }
  };

  const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };
  const createJob = (e) => {
    const data = {
      id: create_UUID(),
      job: e.job,
      priority: priorities[e.priority],
    };
    console.log(data);
    addData(data);
  };

  const style = {
    col1: {
      minWidth: "50%",
    },
    col2: {
      minWidth: "30%",
    },
    col3: {
      minWidth: "20%",
      display: "flex",
      alignItems: "flex-end",
    },
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={(e) => createJob(e)}>
        <Row>
          <Col style={style.col1}>
            <Form.Item
              name="job"
              label="Job Name"
              rules={[
                {
                  required: true,
                },
              ]}
              tooltip="This is a required field"
            >
              <Input placeholder="Write a Job Name" maxLength={255} />
            </Form.Item>
          </Col>
          <Col style={style.col2}>
            <Form.Item
              label="Job Priority"
              name="priority"
              rules={[
                {
                  required: true,
                },
              ]}
              tooltip="This is a required field"
            >
              <Select
                placeholder="Choose"
                value={selectedPriority}
                style={{ color: priorities[selectedPriority]?.color }}
                onChange={(e) => setSelectedPriority(e)}
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
          </Col>
          <Col style={style.col3}>
            <Form.Item>
              <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ jobList }) => {
  localStorage.setItem("jobList", JSON.stringify(jobList));
  return { jobList };
};

const mapDispatchToProps = (dispatch) => ({
  addData: (value) => {
    return addJob(dispatch, value);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
