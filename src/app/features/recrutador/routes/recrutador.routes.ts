import { Router } from "express";
import { RecrutadorController } from "../controllers/recrutador.controller";
import { checkLoginValidator } from "../../login/validators/check-login.validator";
import { checkLoginRecrutadorValidator } from "../validators/check-login-recrutador.validator";

export const recrutadorRoutes = () => {
    const router = Router();

    router.get(
        "/",
        [checkLoginValidator, checkLoginRecrutadorValidator],
        new RecrutadorController().list
    );
    router.post("/", new RecrutadorController().create);

    return router;
};
