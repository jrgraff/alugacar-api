import { StatusCodes } from "http-status-codes";

import { errorsMessages } from "./en_messages";

class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(
    message: keyof typeof errorsMessages,
    statusCode: keyof typeof StatusCodes = "BAD_REQUEST"
  ) {
    this.message = errorsMessages[message];
    this.statusCode = StatusCodes[statusCode];
  }
}

export { AppError };
