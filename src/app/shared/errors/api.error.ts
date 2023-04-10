import { Response } from "express";

export class ApiError {
    public static serverError(res: Response, error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
