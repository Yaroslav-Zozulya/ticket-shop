import request from "supertest";

import { signup } from "../../test/helpers/signup";

import { app } from "../../app";

it("responds with details about current user", async () => {
  const cookie = await signup();

  const response = await request(app)
    .get("/api/users/current-user")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if user not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/current-user")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
