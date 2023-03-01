import { Exceptions } from "../constants";

type ResponseErrorType = {
  errorCode: number;
  errorStatus: string;
  explanation?: string;
  timestamp?: string;
  type?: Exceptions;
  uuid?: string;
};

export default ResponseErrorType;
