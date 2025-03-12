import mongoose from "mongoose";

import { app } from "./app";

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
