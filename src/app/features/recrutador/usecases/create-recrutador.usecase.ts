import { Recrutador } from "../../../models/recrutador.model";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

interface CreateRecrutadorParams {
    nome: string;
    username: string;
    password: string;
    nomeEmpresa: string;
}

export class CreateRecrutadorUsecase {
    public async execute(data: CreateRecrutadorParams): Promise<Return> {
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
        const recrutador = new Recrutador(
            data.nome,
            data.username,
            data.password,
            data.nomeEmpresa
        );

        // 3 - salvar o usuario no BD
        const result = await repository.create(recrutador);

        // 4 - retornar o usuario criado
        return {
            ok: true,
            code: 201,
            message: "Usuário criado com sucesso",
            data: result,
        };
    }
}
