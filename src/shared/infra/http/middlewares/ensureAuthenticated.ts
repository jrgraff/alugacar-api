import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("missing_auth_token", "UNAUTHORIZED");
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, auth.SECRET_TOKEN) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("invalid_token", "UNAUTHORIZED");
  }
}
