import cors from "cors";
import express from "express";
import { recrutadorRoutes } from "../../app/features/recrutador/routes/recrutador.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { vagaRoutes } from "../../app/features/vaga/routes/vaga.routes";
import { candidatoRoutes } from "../../app/features/candidato/routes/candidato.routes";
import { candidaturaRoutes } from "../../app/features/candidatura/routes/candidatura.routes";

export const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/recrutador", recrutadorRoutes());
    app.use("/candidato", candidatoRoutes());
    app.use("/auth", loginRoutes());
    app.use("/vaga", vagaRoutes());
    app.use("/candidatura", candidaturaRoutes());

    return app;
};
