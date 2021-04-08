import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test 2",
      description: "Sample car 2",
      daily_rate: 130,
      license_plate: "TEST2",
      fine_amount: 130,
      brand: "Sample Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Test 2",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test 3",
      description: "Sample car 3",
      daily_rate: 130,
      license_plate: "TEST3",
      fine_amount: 130,
      brand: "Sample Brand Test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Sample Brand Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test 4",
      description: "Sample car 4",
      daily_rate: 130,
      license_plate: "TEST4",
      fine_amount: 130,
      brand: "Sample Brand",
      category_id: "category_id Test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "categor_id Test",
    });

    expect(cars).toEqual([car]);
  });
});
