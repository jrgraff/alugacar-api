import { getRepository, Repository } from "typeorm";

import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  async create(data: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const usersTokens = this.repository.create(data);

    await this.repository.save(usersTokens);

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return usersTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    return this.repository.findOne({ refresh_token });
  }
}

export { UsersTokensRepository };
