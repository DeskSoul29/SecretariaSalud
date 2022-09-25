import { Router } from "express";

import { signin } from "../controllers/authController.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("login", { alert: false });
});

router.get("/404", (req, res) => {
  res.render("tools/404");
});

//router para los métodos del controller
router.post("/", signin);

export default router;
