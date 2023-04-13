import { Router } from "express";
import { CandidaturaController } from "../controllers/candidatura.controller";
import { checkLoginValidator } from "../../login/validators/check-login.validator";
import { checkLoginCandidatoValidator } from "../../candidato/validators/check-login-candidato.validator";

export const candidaturaRoutes = () => {
    const router = Router();

    router.post(
        "/",
        [checkLoginValidator, checkLoginCandidatoValidator],
        new CandidaturaController().create
    );

    return router;
};
