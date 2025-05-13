import { IQuestion } from "../../../question/types/models/question.type";

export interface IQuiz {
  title: string;
  description?: string;
  questions: IQuestion[];
  count?: number;
}
