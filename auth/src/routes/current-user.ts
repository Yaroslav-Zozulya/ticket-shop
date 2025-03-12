import { Router, Request, Response } from "express";

import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = Router();

router.get(
  "/api/users/current-user",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  },
);

export { router as currentUserRouter };
