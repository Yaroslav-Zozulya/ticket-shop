import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 whit invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 whit invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "123",
    })
    .expect(400);
});

it("returns a 400 whit missing email ot password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "123",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
    })
    .expect(400);
});

it("disallow duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("set a cookie after successful login", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
