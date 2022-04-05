export const ADD_JOB = "ADD_JOB";
export const DELETE_JOB = "DELETE_JOB";
export const UPDATE_JOB = "UPDATE_JOB";

export function addJob(dispatch, value) {
  addData(dispatch, value);
}
const addData = async (dispatch, value) => {
  dispatch({
    type: ADD_JOB,
    payload: value,
  });
};
export function deleteJob(dispatch, value) {
  deleteData(dispatch, value);
}
const deleteData = async (dispatch, value) => {
  dispatch({
    type: DELETE_JOB,
    payload: value,
  });
};
export function updateJob(dispatch, value) {
  updateData(dispatch, value);
}
const updateData = async (dispatch, value) => {
  dispatch({
    type: UPDATE_JOB,
    payload: value,
  });
};
