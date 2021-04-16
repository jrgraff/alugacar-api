import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

let usersTokensRepository: IUsersTokensRepository;
let usersRepository: IUsersRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    const generateTokenMail = spyOn(usersTokensRepository, "create");

    await usersRepository.create({
      driver_license: "test_driver_license",
      email: "user@test.com",
      name: "test_user",
      password: "test",
    });

    await sendForgotPasswordMailUseCase.execute("user@test.com");

    expect(sendMail).toHaveBeenCalled();
    expect(generateTokenMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("unexistent@email.com")
    ).rejects.toEqual(new AppError("user_does_not_exists"));
  });
});
