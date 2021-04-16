import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { createDbConnection } from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { generalErrorHandler } from "./middlewares/generalErrorHandler";
import { router } from "./routes";

import "@shared/container";

createDbConnection();
const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(generalErrorHandler);

export { app };
