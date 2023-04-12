import cors from "cors";
import express from "express";
import { recrutadorRoutes } from "../../app/features/recrutador/routes/recrutador.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { vagaRoutes } from "../../app/features/vaga/routes/vaga.routes";

export const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/recrutador", recrutadorRoutes());
    app.use("/auth", loginRoutes());
    app.use("/vaga", vagaRoutes());

    return app;
};
