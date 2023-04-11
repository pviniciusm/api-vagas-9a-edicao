import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { JwtAdapter } from "../../../shared/util/jwt.adapter";

export const checkLoginValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers["authorization"];
        req.headers["usuario"] = "";

        if (!token) {
            return res.status(401).send({
                ok: false,
                message: "Token não foi informado",
            });
        }

        const usuario = JwtAdapter.checkToken(token);
        req.headers["usuario"] = JSON.stringify(usuario);

        return next();
    } catch (error: any) {
        return ApiError.serverError(res, error);
    }
};
