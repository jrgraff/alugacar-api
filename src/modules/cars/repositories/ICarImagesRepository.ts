import { CarImage } from "../infra/typeorm/entities/CarImage";

export interface ISaveCarImageDTO {
  car_id: string;
  image_name: string;
  sequence_position?: number;
}

export interface ICarImagesRepository {
  save(data: ISaveCarImageDTO): Promise<CarImage>;
  findByCarId(car_id: string): Promise<CarImage[]>;
  destroy(id: string): Promise<void>;
}
