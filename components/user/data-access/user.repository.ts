import { IUserAnswer } from "../types/models/userAnswer.type";
import UserAnswerModel from "./models/userAnswer.model";

export const createUserAnswer = async (submitData: IUserAnswer) => {
  return new UserAnswerModel(submitData).save();
};

export const AvgAnswers = () => {
  return UserAnswerModel.aggregate([
    {
      $group: {
        _id: "$quiz",
        avg: { $avg: "$score" },
      },
    },
    { $addFields: { quizId: "$_id" } },
    {
      $lookup: {
        from: "quizzes",
        localField: "quizId",
        foreignField: "_id",
        as: "result",
      },
    },
    { $unwind: { path: "$result" } },
    {
      $project: {
        avg: "$avg",
        quiz: "$result.title",
      },
    },
  ]).exec();
};
