import QuizModel from "./models/quiz.model.js"


export const createQuiz = async (quizData, session) => {
  const quiz = new QuizModel(quizData);
  return quiz.save({ session });
};

export const updateQuizQuestions = async (quizId, questionIds, session) => {
  return Quiz.findByIdAndUpdate(quizId, { questions: questionIds }, { new: true, session });
};

export const getAllQuizzes = async () => {
  try {
    const quizzes = await QuizModel.find().populate({
      path: "questions",
      populate: { path: "answers" }
    });
    return quizzes
  } catch (error) {
    console.error("Repository error in getAllQuizzes:", err);
  }
}

export const getQuizById = async (id) => {
  try {
    const quiz = await QuizModel.findById(id).populate({
      path: "questions",
      populate: { path: "answers" }
    });
    return quiz;
  } catch (error) {
    console.error("Repository error in getQuizById:", err);
  }
}

export const deleteQuiz = async (id) => {
  try {
    const deletedQuiz = QuizModel.findOneAndDelete({ _id: id });
    return deletedQuiz
  } catch (error) {
    console.error("Repository error in deleteQuiz:", err);
  }
}

export const incrementQuizCount = async (id) => {
  return QuizModel.findByIdAndUpdate(
    id,
    { $inc: { count: 1 } }
  );
};