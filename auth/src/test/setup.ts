import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdasd";

  mongo = await MongoMemoryServer.create();
  const mongoUrl = mongo.getUri();

  await mongoose.connect(mongoUrl, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();

  if (collections) {
    for (const collection of collections) {
      await collection.deleteMany();
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongoose.connection.close();
    await mongo.stop();
  }
});
