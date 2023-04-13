import { Candidatura } from "../../../models/candidatura.model";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";
import { VagaRepository } from "../../vaga/database/vaga.repository";
import { CandidaturaRepository } from "../database/candidatura.database";
import { AplicacaoValidator } from "../validators/aplicacao.validator";

interface AplicacaoParams {
    idCandidato: string;
    idVaga: string;
}

export class AplicacaoUsecase {
    public async execute(data: AplicacaoParams): Promise<Return> {
        const usuarioRepository = new UsuarioRepository();
        const candidato = await usuarioRepository.get(data.idCandidato);

        if (!candidato) {
            return {
                ok: false,
                code: 404,
                message: "Candidato não encontrado",
            };
        }

        const vagasRepository = new VagaRepository();
        const vaga = await vagasRepository.get(data.idVaga);

        if (!vaga) {
            return {
                ok: false,
                code: 404,
                message: "Vaga não encontrada",
            };
        }
        const result = AplicacaoValidator.validateVaga(vaga);
        if (!result.ok) {
            return result;
        }

        const repository = new CandidaturaRepository();

        const candidatos = await repository.list(vaga.id);

        if (vaga.maxCandidatos) {
            if (candidatos.length >= vaga.maxCandidatos) {
                return {
                    ok: false,
                    code: 400,
                    message: "Já alcançou o limite de candidaturas.",
                };
            }
        }

        // if (
        //     candidatos.some(
        //         (candidatura) => candidatura.candidato.id === data.idCandidato
        //     )
        // ) {
        //     return {
        //         ok: false,
        //         code: 400,
        //         message: "Você já se candidatou à esta vaga.",
        //     };
        // }
        if (
            AplicacaoValidator.candidaturaDuplicada(
                candidatos,
                data.idCandidato
            )
        ) {
            return {
                ok: false,
                code: 400,
                message: "Você já se candidatou à esta vaga.",
            };
        }

        const newCandidatura = new Candidatura(
            new Date(),
            false,
            candidato,
            vaga
        );
        await repository.create(newCandidatura);
        return {
            ok: true,
            code: 201,
            message: "Você se candidatou a vaga com sucesso",
        };
    }
}
