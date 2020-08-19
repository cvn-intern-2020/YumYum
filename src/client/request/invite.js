import axios from "axios";

export const getInviteRequest = (inviteHash) => {
  return axios
    .get(`${process.env.API_URL}/api/invite/${inviteHash}`)
    .then((res) => {
      return { status: true, groupId: res.data.groupId };
    })
    .catch((err) => {
      if (err.response.status == 401) {
        window.location.replace(process.env.FRONT_END_URL);
      }
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};

export const createInviteRequest = (groupId) => {
  return axios
    .get(`${process.env.API_URL}/api/invite/group/${groupId}`)
    .then((res) => {
      return { status: true, hash: res.data.hash };
    })
    .catch((err) => {
      if (err.response.status == 401) {
        window.location.replace(process.env.FRONT_END_URL);
      }
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};
