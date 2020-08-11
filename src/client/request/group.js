import axios from "axios";

export const createGroupRequest = ({ name, description }, token) => {
  return axios
    .post(
      `${process.env.API_URL}/api/groups/new`,
      {
        name: name,
        description: description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(() => {
      return { status: true };
    })
    .catch((err) => {
      return { status: false, message: err.response.data.message };
    });
};

export const getGroupRequest = (groupId, token) => {
  return axios
    .get(`${process.env.API_URL}/api/groups/${groupId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return { status: true, groupData: res.data };
    })
    .catch((err) => {
      return { status: false, message: err.response.data.message };
    });
};

export const addMemberRequest = (groupId, email, token) => {
  return axios
    .post(
      `${process.env.API_URL}/api/groups/${groupId}/add/member`,
      {
        userEmail: email,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(() => {
      return { status: true, message: "Add Sucessfully" };
    })
    .catch((err) => {
      return { status: false, message: err.response.data.message };
    });
};
