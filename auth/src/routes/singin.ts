import { Router, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "@sn-777/common";
import { validateRequest } from "@sn-777/common";

import { UserModel } from "../models/user";
import { Password } from "../services/password";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password can't be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password,
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY!,
    );

    req.session = { jwt: userJwt };
    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
