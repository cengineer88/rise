import { ADD_JOB, DELETE_JOB, UPDATE_JOB } from "../actions/job-list-actions";

const storageData = JSON.parse(localStorage.getItem("jobList"));
const initialState = {
  data: storageData ? storageData.data : [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOB:
      return {
        ...state,
        data:
          state.data.findIndex((item) => {
            return item.id === action.payload.id;
          }) === -1
            ? [...state.data, action.payload]
            : state.data,
      };
    case DELETE_JOB:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case UPDATE_JOB:
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[index].priority = action.payload.priority;
      return {
        ...state,
        data: state.data,
      };
    default:
      return state;
  }
};
