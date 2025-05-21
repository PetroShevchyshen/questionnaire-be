import { IAnswerRequest } from "../../../answer/types/request/answer.type";

export interface IQuestion {
  text: string;
  answers?: IAnswerRequest[];
}
