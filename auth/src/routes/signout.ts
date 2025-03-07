import { Router } from "express";

const router = Router();

router.post("/api/users/signout", async (req, res) => {
  res.send("signout");
});

export { router as signoutRouter };
