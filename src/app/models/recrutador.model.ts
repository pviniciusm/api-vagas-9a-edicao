import { TipoUsuario, Usuario } from "./usuario.model";

export class Recrutador extends Usuario {
    constructor(
        nome: string,
        username: string,
        password: string,
        nomeEmpresa: string
    ) {
        super(nome, username, password, TipoUsuario.Recrutador, nomeEmpresa);
    }
}
