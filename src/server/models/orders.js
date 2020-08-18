import mongoose from "mongoose";
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

const OrdersModel = mongoose.model("Orders", OrdersSchema);
export default OrdersModel;
