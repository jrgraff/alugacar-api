import { getRepository, Repository } from "typeorm";

import {
  ICarImagesRepository,
  ISaveCarImageDTO,
} from "@modules/cars/repositories/ICarImagesRepository";

import { CarImage } from "../entities/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async save(carImageData: ISaveCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create(carImageData);

    await this.repository.save(carImage);

    return carImage;
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    return this.repository.find({ where: { car_id } });
  }

  async destroy(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { CarImagesRepository };
