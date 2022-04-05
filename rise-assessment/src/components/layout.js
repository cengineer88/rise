import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { connect } from "react-redux";
import { addJob } from "../actions/job-list-actions";
import CreateJob from "./create-job";
import JobList from "./job-list";

const CustomLayout = ({ setInfo, jobList }) => {
  useEffect(() => {
    setInfo((prevState) => ({
      ...prevState,
      count: jobList.data.length,
    }));
  }, [jobList]);

  const style = {
    height: "calc(100vh - 100px)",
    overflow: "scroll",
  };

  return (
    <div style={style}>
      <Divider orientation="left">Create New Job</Divider>
      <CreateJob />
      {jobList.data.length > 0 && (
        <>
          <Divider orientation="left">Job List</Divider>
          <JobList data={jobList} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ jobList }) => {
  return { jobList };
};

export default connect(mapStateToProps)(CustomLayout);
