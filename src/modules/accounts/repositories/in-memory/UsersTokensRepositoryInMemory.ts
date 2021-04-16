import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/entities/UsersTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UsersTokens[] = [];

  async create(data: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, data);

    this.usersTokens.push(userToken);

    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    return this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token &&
        refresh_token
    );
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }
}

export { UsersTokensRepositoryInMemory };
