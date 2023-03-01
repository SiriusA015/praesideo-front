import axios, { AxiosError } from "axios";
import { ExceptionMessage, Exceptions } from "../constants";
import ResponseErrorType from "../models/ResponseErrorType";

const DEFAULT_ERROR_MESSAGE = "Request failed";

export const errorHandler = (error: unknown) => {
  let errorText = DEFAULT_ERROR_MESSAGE;
  if (axios.isAxiosError(error)) {
    const errorType = (error as AxiosError<ResponseErrorType>)?.response?.data
      ?.type;
    if (errorType) {
      let message: Exceptions | string | undefined =
        error?.response?.data?.type;

      if (Object.keys(Exceptions).includes(errorType)) {
        message = ExceptionMessage[errorType];
      } else if (error?.response?.data?.explanation) {
        message = error?.response?.data?.explanation;
      }
      errorText = message || errorType;
    } else {
      errorText = error.message || DEFAULT_ERROR_MESSAGE;
    }
  } else {
    errorText = (error as Error)?.toString() || DEFAULT_ERROR_MESSAGE;
  }

  return {
    error: errorText,
  };
};
