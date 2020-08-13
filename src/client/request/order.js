import axios from "axios";

export const createOrderRequest = (groupId, token, details, totalPrice) => {
  return axios
    .post(
      `${process.env.API_URL}/api/orders/new`,
      {
        groupId: groupId,
        details,
        totalPrice: totalPrice,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      return { status: true, message: "Add success", newOrder: res.data };
    })
    .catch((err) => {
      console.log(err.response.data.message);
      return { status: false, message: err.response.data.message };
    });
};
