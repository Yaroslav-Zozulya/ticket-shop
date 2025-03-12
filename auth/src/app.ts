import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/singin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }),
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };
