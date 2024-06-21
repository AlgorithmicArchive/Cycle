import mongoose from "mongoose";
import Cycle from "../../models/CycleModel.js";

export const GetLastRecord = async (req, res) => {
  const userId = req.query.user_id;
  let user_id = new mongoose.Types.ObjectId(userId);
  console.log(user_id);
  const lastrecord = await Cycle.findOne({
    user_id: user_id,
    endDay: { $ne: 0 },
  }).sort({
    endYear: -1,
    endMonth: -1,
    endDay: -1,
  });

  res.status(200).json({ lastrecord: lastrecord });
};
