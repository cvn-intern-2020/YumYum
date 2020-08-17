import axios from "axios";

export const createGroupRequest = ({ name, description }) => {
  return axios
    .post(`${process.env.API_URL}/api/groups/new`, {
      name: name,
      description: description,
    })
    .then(() => {
      return { status: true };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};

export const getGroupRequest = (groupId) => {
  return axios
    .get(`${process.env.API_URL}/api/groups/${groupId}`)
    .then((res) => {
      return { status: true, groupData: res.data };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};

export const addMemberRequest = (groupId, email) => {
  return axios
    .post(`${process.env.API_URL}/api/groups/${groupId}/add/member`, {
      userEmail: email,
    })
    .then(() => {
      return { status: true, message: "Add Sucessfully" };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};

export const editDishesInGroupRequest = (groupId, dishArray) => {
  return axios
    .post(`${process.env.API_URL}/api/groups/${groupId}/dishes`, {
      dishes: dishArray,
    })
    .then((res) => {
      return { status: true, newDishes: res.data.newDishes };
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};
