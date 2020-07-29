import mongoose from "mongoose";

const Dishes = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const DishesSchema = new Dishes({
    groupId: {type: ObjectId, required: true, ref: "Groups"},
    name: { type: String, required: true },
    price: { type: Number, required: true}
});

DishesSchema.statics.getDishById = async function(dishId){
    let result = await this.findOne({_id: mongoose.Types.ObjectId(dishId)}).select("-_id").lean();
    return result
};

const dishesModel = mongoose.model("Dishes", DishesSchema);
export default dishesModel;