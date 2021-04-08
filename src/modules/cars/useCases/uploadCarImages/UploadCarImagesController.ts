import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { files } = request;

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    let images_name: string[] = [];

    if (Array.isArray(files)) {
      images_name = files.map((file) => file.filename);
    }

    await uploadCarImageUseCase.execute({ car_id: id, images_name });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
