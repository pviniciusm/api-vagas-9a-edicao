import { NextFunction, Request, Response } from "express";
import { TipoUsuario } from "../../../models/usuario.model";
import { ApiError } from "../../../shared/errors/api.error";

export const checkLoginCandidatoValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const usuario = req.headers["usuario"] as string;

        if (!usuario) {
            return res.status(401).send({
                ok: false,
                message: "Usuário não está logado",
            });
        }

        const decodedUsuario = JSON.parse(usuario);

        if (decodedUsuario.tipo !== TipoUsuario.Candidato) {
            return res.status(403).send({
                ok: false,
                message: "Usuário não possui permissão",
            });
        }

        return next();
    } catch (error: any) {
        return ApiError.serverError(res, error);
    }
};
