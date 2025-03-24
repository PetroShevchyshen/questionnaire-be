import UserAnswer from "../models/UserAnswer.js"
import Quiz from "../models/Quiz.js";


export const submitAnswer = async (req, res) => {
  try {
    const answer = new UserAnswer(req.body);
    await answer.save();

    await Quiz.findByIdAndUpdate(req.body.quiz, { $inc: { count: 1 } });
    res.status(200).json(answer);
  } catch (error) {
    console.log(error)
  }
}