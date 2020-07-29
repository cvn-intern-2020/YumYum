import mongoose, { Mongoose } from "mongoose";
import dishesModel from "./dishes";
const Orders = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const OrdersSchema = new Orders({
  groupId: { type: ObjectId, required: true, ref: "Groups" },
  userId: { type: ObjectId, required: true, ref: "Users" },
  details: {},
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

OrdersSchema.statics.getOrderById = async function (orderId) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(orderId) });

  for (let dishId of Object.keys(result.details)) {
    let orderDetail = await dishesModel.getDishById(dishId);
    result.details[dishId] = { ...orderDetail, amount: result.details[dishId] };
    console.log(result.details[dishId]);
  }
  console.log(result);
  // result = result[0];
  // let key = Object.keys(result.details)
  // dishesModel.getDishById(key[0]);
};

const OrdersModel = mongoose.model("Orders", OrdersSchema);
export default OrdersModel;
