import { Router } from "express";
import { RecrutadorController } from "../controllers/recrutador.controller";

export const recrutadorRoutes = () => {
    const router = Router();

    router.get("/", new RecrutadorController().list);
    router.post("/", new RecrutadorController().create);

    return router;
};
