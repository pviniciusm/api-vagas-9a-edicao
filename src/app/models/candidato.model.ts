import { TipoUsuario, Usuario } from "./usuario.model";

export class Candidato extends Usuario {
    constructor(nome: string, username: string, password: string) {
        super(nome, username, password, TipoUsuario.Candidato);
    }
}
