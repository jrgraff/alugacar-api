import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: DayjsDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.SECRET_REFRESH_TOKEN) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      sub,
      token
    );

    if (!userToken) {
      throw new AppError("invalid_token");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_date = this.dateProvider.addDays(
      auth.EXPIRES_REFRESH_TOKEN_DAYS
    );

    const refresh_token = sign({ email }, auth.SECRET_REFRESH_TOKEN, {
      subject: sub,
      expiresIn: auth.EXPIRES_IN_TOKEN,
    });

    await this.usersTokensRepository.create({
      user_id: sub,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, auth.SECRET_TOKEN, {
      subject: sub,
      expiresIn: auth.EXPIRES_IN_TOKEN,
    });

    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
