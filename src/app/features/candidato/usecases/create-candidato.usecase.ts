import { Candidato } from "../../../models/candidato.model";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

interface CreateCandidatoParams {
    nome: string;
    username: string;
    password: string;
    nomeEmpresa: string;
}

export class CreateCandidatoUsecase {
    public async execute(data: CreateCandidatoParams): Promise<Return> {
        // 1- validar se o usuario ja existe (username)
        const repository = new UsuarioRepository();
        const usuario = await repository.getByUsername(data.username);

        if (usuario !== null) {
            return {
                ok: false,
                code: 400,
                message: "Usuario já existe",
            };
        }

        // 2 - criar o model Recrutador
        const recrutador = new Candidato(
            data.nome,
            data.username,
            data.password
        );

        // 3 - salvar o usuario no BD
        const result = await repository.create(recrutador);

        // 4 - retornar o usuario criado
        return {
            ok: true,
            code: 201,
            message: "Candidato criado com sucesso",
            data: result,
        };
    }
}
