import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("Missing environment JWT_KEY");
    }

    if (!process.env.MONGO_DB_URI) {
      throw new Error("Missing environment MONGO_DB_URI");
    }

    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongodb");
  } catch (err: any) {
    console.log(err.message);
  }

  app.listen(3000, () => {
    console.log("Tickets service listening on port 3000");
  });
};

void start();
