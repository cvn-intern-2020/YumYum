import mongoose from "mongoose";
import dishesModel from "./dishes";
const Orders = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const OrdersSchema = new Orders({
  groupId: { type: ObjectId, required: true, ref: "Groups" },
  userId: { type: ObjectId, required: true, ref: "Users" },
  details: [
    {
      dishId: { type: ObjectId, required: true, ref: "Dish" },
      dishName: { type: String, required: true },
      dishPrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, required: true, default: Date.now },
  totalPrice: { type: Number, required: true },
});

OrdersSchema.statics.getOrderById = async function (orderId) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(orderId) });

  for (let dishId of Object.keys(result.details)) {
    let orderDetail = await dishesModel.getDishById(dishId);
    result.details[dishId] = { ...orderDetail, amount: result.details[dishId] };
  }
};

const OrdersModel = mongoose.model("Orders", OrdersSchema);
export default OrdersModel;
