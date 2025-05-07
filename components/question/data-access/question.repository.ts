import QuestionModel from "./models/question.model";

export const createQuestion = async (questionData, session) => {
  try {
    const question = new QuestionModel(questionData);
    return await question.save({ session });
  } catch (error) {
    console.error("Repository error in createQuestion:", error);
    throw error;
  }
};

export const updateQuestionAnswers = async (questionId, answerIds, session) => {
  return QuestionModel.findByIdAndUpdate(
    questionId,
    { answers: answerIds },
    { new: true, session }
  )
    .exec()
    .catch((error) => {
      console.error("Repository error in updateQuestionAnswers:", error);
      throw error;
    });
};
