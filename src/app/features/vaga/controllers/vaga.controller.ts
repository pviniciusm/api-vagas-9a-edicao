import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { ListVagasUsecase } from "../usecases/list-vagas.usecase";
import { CreateVagaUsecase } from "../usecases/create-vaga.usecase";

export class VagaController {
    public async list(req: Request, res: Response) {
        try {
            const usecase = new ListVagasUsecase();
            const result = await usecase.execute();

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const {
                descricao,
                nomeEmpresa,
                dtLimite,
                indAtivo,
                maxCandidatos,
            } = req.body;

            const usuario = req.headers["usuario"] as string;
            const usuarioDecoded = JSON.parse(usuario);

            const usecase = new CreateVagaUsecase();
            const result = await usecase.execute({
                descricao,
                nomeEmpresa,
                dtLimite,
                indAtivo,
                maxCandidatos,
                idRecrutador: usuarioDecoded.id,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            ApiError.serverError(res, error);
        }
    }
}
