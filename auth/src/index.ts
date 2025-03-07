import express from "express";
import { json } from "body-parser";

import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/singin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";

import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Auth service listening on port 3000");
});
