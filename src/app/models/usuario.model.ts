import { v4 as createUuid } from "uuid";

export enum TipoUsuario {
    Admin = "A",
    Candidato = "C",
    Recrutador = "R",
}

export class Usuario {
    private _id: string;

    constructor(
        public nome: string,
        public username: string,
        public password: string,
        public tipo: TipoUsuario,
        public nomeEmpresa?: string
    ) {
        this._id = createUuid();
    }

    public static create(
        id: string,
        nome: string,
        username: string,
        password: string,
        tipo: TipoUsuario,
        nomeEmpresa: string
    ) {
        const usuario = new Usuario(
            nome,
            username,
            password,
            tipo,
            nomeEmpresa
        );

        usuario._id = id;
        return usuario;
    }

    public get id() {
        return this._id;
    }
}
