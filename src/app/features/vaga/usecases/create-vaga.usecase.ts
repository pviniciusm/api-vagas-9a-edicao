import { Vaga } from "../../../models/vaga.model";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";
import { VagaRepository } from "../database/vaga.repository";

interface CreateVagaParams {
    descricao: string;
    nomeEmpresa: string;
    dtLimite: Date;
    idRecrutador: string;
    maxCandidatos?: number;
    indAtivo?: boolean;
}

export class CreateVagaUsecase {
    public async execute(data: CreateVagaParams): Promise<Return> {
        // 1- validar campos (to-do)

        // 2- verificar dtLimite
        if (data.dtLimite < new Date()) {
            return {
                ok: false,
                code: 400,
                message: "A data deve ser superior a data atual",
            };
        }

        if (data.indAtivo === undefined) {
            data.indAtivo = true;
        }

        // 3- verificar se o recrutador existe
        const usuarioRepository = new UsuarioRepository();
        const recrutador = await usuarioRepository.get(data.idRecrutador);

        if (!recrutador) {
            return {
                ok: false,
                code: 404,
                message: "A data deve ser superior a data atual",
            };
        }

        // 4- criar e salvar a vaga
        const vaga = new Vaga(
            data.descricao,
            data.nomeEmpresa,
            data.dtLimite,
            data.indAtivo,
            recrutador,
            data.maxCandidatos
        );

        const repository = new VagaRepository();
        await repository.create(vaga);

        return {
            ok: true,
            code: 201,
            message: "A vaga foi criada com sucesso",
            data: vaga,
        };
    }
}
