import "express-async-errors";
import "reflect-metadata";
import express, { json } from "express";
import helmet from "helmet";

import userRouter from "./routes/user.routes";

import { handleErrors } from "./middleware/handleError.middleware";

const app = express();

app.use(helmet());
app.use(json());

app.use(userRouter);

app.use(handleErrors.execute);

export default app;
