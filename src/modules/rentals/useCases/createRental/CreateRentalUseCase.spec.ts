import dayjs from "dayjs";

import { RentalsRepositoryinMemory } from "@modules/rentals/repositories/in-memory/RentalsReposirotyInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryinMemory: RentalsRepositoryinMemory;

describe("Create Rental", () => {
  const dayAdd = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryinMemory = new RentalsRepositoryinMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryinMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "teste1",
      car_id: "teste1",
      expected_return_date: dayAdd,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if the user have another one open", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "teste2",
        car_id: "teste2",
        expected_return_date: dayAdd,
      });

      await createRentalUseCase.execute({
        user_id: "teste2",
        car_id: "teste3",
        expected_return_date: dayAdd,
      });
    }).toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if the car have another one open", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "teste4",
        car_id: "teste4",
        expected_return_date: dayAdd,
      });

      await createRentalUseCase.execute({
        user_id: "teste5",
        car_id: "teste4",
        expected_return_date: dayAdd,
      });
    }).toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "teste6",
        car_id: "teste6",
        expected_return_date: dayjs().toDate(),
      });
    }).toBeInstanceOf(AppError);
  });
});
