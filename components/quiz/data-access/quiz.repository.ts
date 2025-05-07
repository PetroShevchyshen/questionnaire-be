import QuizModel from "./models/quiz.model";

export const createQuiz = async (quizData, session) => {
  try {
    const quiz = new QuizModel(quizData);
    return await quiz.save({ session });
  } catch (error) {
    console.error("Repository error in createQuiz:", error);
    throw error;
  }
};

export const updateQuizQuestions = async (quizData, session) => {
  return QuizModel.findByIdAndUpdate(
    quizData.quizId,
    { questions: quizData.questionIds },
    { new: true, session }
  )
    .exec()
    .catch((error) => {
      console.error("Repository error in updateQuizQuestions:", error);
      throw error;
    });
};

export const getAllQuizzes = async () => {
  return QuizModel.find()
    .populate({
      path: "questions",
      populate: { path: "answers" },
    })
    .exec()
    .catch((error) => {
      console.error("Repository error in getAllQuizzes:", error);
      throw error;
    });
};

export const getQuizById = async (id) => {
  return QuizModel.findById(id)
    .populate({
      path: "questions",
      populate: { path: "answers" },
    })
    .exec()
    .catch((error) => {
      console.error("Repository error in getQuizById:", error);
      throw error;
    });
};

export const deleteQuiz = async (id) => {
  return QuizModel.findOneAndDelete({ _id: id })
    .exec()
    .catch((error) => {
      console.error("Repository error in deleteQuiz:", error);
      throw error;
    });
};

export const incrementQuizCount = async (id) => {
  return QuizModel.findByIdAndUpdate(id, { $inc: { count: 1 } })
    .exec()
    .catch((error) => {
      console.error("Repository error in incrementQuizCount:", error);
      throw error;
    });
};
