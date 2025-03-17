import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { NotFoundError } from "@sn-777/common";
import { errorHandler } from "@sn-777/common";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }),
);

app.get("/api/tickets", (req, res) => {
  res.send("HELLO");
});

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export { app };
