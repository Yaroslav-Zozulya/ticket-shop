// Example how you can use set new method to Global object

// import request from "supertest";
// import { app } from "../../app";
//
// declare global {
//   var signup: () => Promise<string[]>;
// }
//
// global.signup = async () => {
//   const email = "test@test.com";
//   const password = "password";
//
//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({ email, password })
//     .expect(201);
//
//   const cookie = response.get("Set-Cookie");
//   if (!cookie) {
//     throw new Error("Failed to get cookie from response");
//   }
//   return cookie;
// };

import request from "supertest";
import { app } from "../../app";

export const signup = async (): Promise<string[]> => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  if (!cookie) {
    throw new Error("Failed to get cookie from response");
  }
  return cookie;
};
