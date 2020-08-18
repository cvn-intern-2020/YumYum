import mongoose from "mongoose";

const Dishes = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const DishesSchema = new Dishes({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  deleteAt: { type: Date, default: null },
  userId: { type: ObjectId, required: true, ref: "Users" },
});

const dishesModel = mongoose.model("Dishes", DishesSchema);
export default dishesModel;
