import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
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
app.use(cookieSession({ signed: false, secure: true }));

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

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("Missing environment JWT_KEY");
    }

    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to mongodb");
  } catch (err: any) {
    console.log(err.message);
  }

  app.listen(3000, () => {
    console.log("Auth service listening on port 3000");
  });
};

void start();
