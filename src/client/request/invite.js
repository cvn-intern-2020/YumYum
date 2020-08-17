import axios from "axios";

export const getInviteRequest = (inviteToken) => {
  return axios
    .get(`${process.env.API_URL}/api/invite/${inviteToken}`)
    .then((res) => {
      return { status: true, groupId: res.data.groupId };
    })
    .catch((err) => {
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
      return { status: true, token: res.data.token };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};
