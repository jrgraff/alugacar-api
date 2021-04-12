import dayjs from "dayjs";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryinMemory } from "@modules/rentals/repositories/in-memory/RentalsReposirotyInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryinMemory: IRentalsRepository;
let carsRepositoryInMemory: ICarsRepository;
let dayjsDateProvider: IDateProvider;

describe("Create Rental", () => {
  const dayAdd = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryinMemory = new RentalsRepositoryinMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryinMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test1",
      description: "car_test1",
      daily_rate: 100,
      license_plate: "test1",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "teste1",
      car_id: car.id,
      expected_return_date: dayAdd,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if the user have another one open", async () => {
    await rentalsRepositoryinMemory.create({
      car_id: "teste2",
      expected_return_date: dayAdd,
      user_id: "teste2",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "teste2",
        car_id: "teste_",
        expected_return_date: dayAdd,
      })
    ).rejects.toEqual(
      new AppError("There is a rental in progress for this user!")
    );
  });

  it("should not be able to create a new rental if the car have another one open", async () => {
    await rentalsRepositoryinMemory.create({
      car_id: "teste3",
      expected_return_date: dayAdd,
      user_id: "teste3",
    });

    expect(
      createRentalUseCase.execute({
        user_id: "teste_",
        car_id: "teste3",
        expected_return_date: dayAdd,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "teste6",
        car_id: "teste6",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
