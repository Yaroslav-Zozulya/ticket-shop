import { Router, Request, Response } from "express";

import { currentUser } from "@sn-777/common";

const router = Router();

router.get(
  "/api/users/current-user",
  currentUser,
  async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  },
);

export { router as currentUserRouter };
