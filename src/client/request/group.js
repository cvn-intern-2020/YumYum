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

export const editDishesInGroupRequest = (groupId, dishArray, token) => {
  return axios
    .post(
      `${process.env.API_URL}/api/groups/5f31fe6731cf9b13ab7c6756/dishes`,
      {
        dishes: [
          "5f34a9eed493e64640455682",
          "5f34aa20d43e7a3410e530a6",
          "5f31ff43e217a3ecc2c9b56e",
          "5f320adce217a3ecc2c9b56f"
      ],
      },
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMxZjhhNjRlYTQzNDAyNzA2Yzc4ZjciLCJlbWFpbCI6ImNsb25lNEBnbWFpbC5jb20iLCJpYXQiOjE1OTcyOTc5MDEsImV4cCI6MTU5NzMwMTUwMX0.zxnbGcQuhdZAvC2C1O3eQwNcgbZhLZDqrBf6wKX_O4Q",
        },
      }
    )
    .then((res) => {
      return { status: true, newDishes: res.data.newDishes };
    })
    .catch((err) => {
      return { status: false, message: err.response.data.message };
    });
};
