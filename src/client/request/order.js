import axios from "axios";
import convertOderFormat from "../utils/convertOrderFormat";

export const createOrderRequest = (
  { groupId },
  token,
  { details, totalPrice }
) => {
  return axios
    .post(
      `${process.env.API_URL}/api/orders/new`,
      {
        groupId: groupId,
        details: convertOderFormat(details),
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
      return { status: false, message: err.response.data.message };
    });
};
