import { Request, Response } from "express";

import { AppError } from "@shared/errors/AppErrors";

async function generalErrorHandler(
  err: Error,
  request: Request,
  response: Response
): Promise<Response> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
}

export { generalErrorHandler };
