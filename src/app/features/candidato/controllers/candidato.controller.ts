import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { ListCandidatosUsecase } from "../usecases/list-candidatos.usecase";
import { CreateCandidatoUsecase } from "../usecases/create-candidato.usecase";

export class CandidatoController {
    public async list(req: Request, res: Response) {
        try {
            const result = await new ListCandidatosUsecase().execute();

            return res.status(200).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { nome, username, password } = req.body;

            // to-do: validações de campos

            const result = await new CreateCandidatoUsecase().execute(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }
}
