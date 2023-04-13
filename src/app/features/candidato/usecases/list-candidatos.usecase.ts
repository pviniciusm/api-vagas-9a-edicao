import { TipoUsuario } from "../../../models/usuario.model";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

export class ListCandidatosUsecase {
    public async execute(): Promise<Return> {
        const repository = new UsuarioRepository();
        const result = await repository.list(TipoUsuario.Candidato);

        return {
            ok: true,
            data: result,
            code: 200,
            message: "Candidatos listados com sucesso",
        };
    }
}
