import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Sample car",
      daily_rate: 130,
      license_plate: "TEST1",
      fine_amount: 130,
      brand: "Sample Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute();
    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", () => {
    20:15 - rs
  })
});
