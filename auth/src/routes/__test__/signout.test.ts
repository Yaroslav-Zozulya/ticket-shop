import request from "supertest";
import { app } from "../../app";

it("clears cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@email.com", password: "password" })
    .expect(201);

  const response = await request(app).post("/api/users/signout").expect(200);

  const cookies = response.get("Set-Cookie");
  expect(cookies).toBeDefined();

  expect(cookies?.[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  );
});
