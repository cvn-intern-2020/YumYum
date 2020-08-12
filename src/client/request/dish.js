import axios from "axios";

export const createDishRequest = ({ name, price }, token) => {
  return axios
    .post(
      `${process.env.API_URL}/api/dishes/new`,
      {
        name: name,
        price: price,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      return { status: true, message: "Add success", newDish: res.data };
    })
    .catch((err) => {
      return { status: false, message: err.response.data.message };
    });
};

export const deleteDishRequest = (dishId, token) => {
  return axios
    .delete(
      `${process.env.API_URL}/api/dishes/${dishId}`,
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then((res) => {
      return { status: true, message: "Successfully deleted", newDish: res.data };
    })
    .catch((err) => {
      return { status: false, message: err.response.data.message };
    });
};
