import { Router } from "express";

import { signin } from "../controllers/authController.js";
import { isAuthenticated, changePass, searchPass } from "../helpers/auth.js";

const router = Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("login", { alert: false });
});

router.get("/Tools/changePassword", searchPass, (req, res) => {
  res.render("tools/changePassword", { user: req.user, alert: undefined });
});

router.post("/Tools/changePassword/:id", searchPass, changePass, (req, res) => {
  res.render("tools/changePassword", {
    user: req.user,
    alert: req.alert,
  });
});

router.get("/404", (req, res) => {
  res.render("tools/404");
});

router.post("/", signin);

export default router;
