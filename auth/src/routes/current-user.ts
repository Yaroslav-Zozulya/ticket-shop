import { Router } from "express";

const router = Router();

router.get("/api/users/current-user", async (req, res) => {
  res.send("Current User");
});

export { router as currentUserRouter };
