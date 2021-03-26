import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createSpecificationController = new CreateUserController();

usersRoutes.post("/", createSpecificationController.handle);

export { usersRoutes };
