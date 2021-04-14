import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
