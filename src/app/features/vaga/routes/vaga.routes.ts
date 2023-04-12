import { Router } from "express";
import { VagaController } from "../controllers/vaga.controller";
import { checkLoginValidator } from "../../login/validators/check-login.validator";
import { checkLoginRecrutadorValidator } from "../../recrutador/validators/check-login-recrutador.validator";

export const vagaRoutes = () => {
    const router = Router();

    router.get("/", new VagaController().list);
    router.post(
        "/",
        [checkLoginValidator, checkLoginRecrutadorValidator],
        new VagaController().create
    );

    return router;
};
