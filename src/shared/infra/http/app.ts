import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import { createDbConnection } from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { generalErrorHandler } from "./middlewares/generalErrorHandler";
import { router } from "./routes";

import "@shared/container";

createDbConnection();
const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(generalErrorHandler);

export { app };
