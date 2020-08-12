import mongoose from "mongoose";

const Dishes = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const DishesSchema = new Dishes({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  deleteAt: { type: Date, default: null },
  userId: { type: ObjectId, required: true, ref: "Users" },
});

DishesSchema.statics.getDishById = async function (dishId) {
  let result = await this.findOne({ _id: mongoose.Types.ObjectId(dishId) })
    .select("-_id")
    .lean();
  return result;
};

DishesSchema.statics.createDish = async function (name, price, userId) {
  let result = await this.create({
    name: name,
    price: price,
    userId: mongoose.Types.ObjectId(userId),
  });
  return result;
};
const dishesModel = mongoose.model("Dishes", DishesSchema);
export default dishesModel;
