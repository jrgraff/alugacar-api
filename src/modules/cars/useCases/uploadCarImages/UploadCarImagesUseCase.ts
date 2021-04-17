import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const existingImages = await this.carImagesRepository.findByCarId(car_id);

    if (existingImages.length) {
      existingImages.forEach((image) => {
        this.carImagesRepository.destroy(image.id);
        this.storageProvider.delete(`./tmp/cars/${image.image_name}`, "cars");
      });
    }

    images_name.forEach(async (image_name, sequence_position) => {
      await this.carImagesRepository.save({
        car_id,
        image_name,
        sequence_position,
      });
      await this.storageProvider.save(image_name, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
