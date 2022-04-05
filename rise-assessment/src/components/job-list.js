import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Input } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { deleteJob, updateJob } from "../actions/job-list-actions";
import { DeleteModal } from "./delete-modal";
import UpdateModal from "./update-modal";

const JobList = ({ jobList, removeData, updateData }) => {
  const [tableData, setTableData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  let searchInput;
  useEffect(() => {
    if (jobList) {
      setTableData(
        jobList.data.map((item) => {
          return new Object({
            key: item.id,
            name: item.job,
            priority: item.priority,
          });
        })
      );

      console.log(tableData);
    }
  }, [jobList]);

  const openUpdateModal = (record) => {
    setSelectedItem(record);
    setVisible(true);
  };

  const update = (res) => {
    setVisible(false);
    if (res) {
      const data = {
        id: res.key,
        priority: res.priority,
      };
      console.log(data);
      updateData(data);
    }
  };
  const remove = (job) => {
    DeleteModal((res) => {
      if (res === "Ok") removeData(job.key);
    });
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) => text,
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      onFilter: (value, record) => record.name.startsWith(value),
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name) => <a>{name}</a>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        {
          text: "Urgent",
          value: 0,
        },
        {
          text: "Regular",
          value: 1,
        },
        {
          text: "Trivial",
          value: 2,
        },
      ],
      onFilter: (value, record) => record.priority.id === value,
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.priority.id - b.priority.id,
      render: (priority) => (
        <Tag color={priority.bgColor}>{priority.name?.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            ghost
            icon={<FormOutlined />}
            onClick={() => openUpdateModal(record)}
          ></Button>
          <Button
            type="danger"
            ghost
            icon={<DeleteOutlined />}
            onClick={() => remove(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <Table columns={columns} dataSource={tableData} />
      {visible && (
        <UpdateModal data={selectedItem} callback={(res) => update(res)} />
      )}
    </div>
  );
};

const mapStateToProps = ({ jobList }) => {
  return { jobList };
};

const mapDispatchToProps = (dispatch) => ({
  removeData: (value) => {
    return deleteJob(dispatch, value);
  },
  updateData: (value) => {
    return updateJob(dispatch, value);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
