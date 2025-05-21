import { IAnswerRequest } from "../../../answer/types/request/answer.type";

export interface IQuestionRequest {
  text: string;
  answers: IAnswerRequest[];
}
