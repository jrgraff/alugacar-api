import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC1D23",
      fine_amount: 10,
      brand: "Brand",
      category_id: "uuid",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists licence plate", async () => {
    await createCarUseCase.execute({
      name: "Licence Car 1",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC2D23",
      fine_amount: 10,
      brand: "Brand",
      category_id: "uuid",
    });

    await expect(
      createCarUseCase.execute({
        name: "Licence Car 2",
        description: "Description 2",
        daily_rate: 200,
        license_plate: "ABC2D23",
        fine_amount: 20,
        brand: "Brand",
        category_id: "uuid",
      })
    ).rejects.toEqual(new AppError("car_already_registered"));
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC3D23",
      fine_amount: 10,
      brand: "Brand",
      category_id: "uuid",
    });

    expect(car.available).toBe(true);
  });
});
