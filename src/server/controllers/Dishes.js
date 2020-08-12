import { getDishByUserId} from "../services/dishService";


export const getDishByUserIdController = async (req, res) => {
  console.log(req);
  let userId = req.params.userId;
  let result = await getDishByUserId(userId);
  if (!result.status) {
    return res.status(400).json(result.message);
  }
  return res.status(200).json(result.result);
};
