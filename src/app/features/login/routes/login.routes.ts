import { Router } from "express";
import { LoginController } from "../controllers/login.controller";

export const loginRoutes = () => {
    const router = Router();

    router.post("/", new LoginController().login);

    return router;
};
