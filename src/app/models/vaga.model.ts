import { Recrutador } from "./recrutador.model";
import { v4 as createUuid } from "uuid";

export class Vaga {
    private _id: string;

    constructor(
        public descricao: string,
        public nomeEmpresa: string,
        public dtLimite: Date,
        public indAtivo: boolean,
        public recrutador: Recrutador,
        public maxCandidatos?: number
    ) {
        this._id = createUuid();
    }

    public get id() {
        return this._id;
    }

    public static create(
        id: string,
        descricao: string,
        nomeEmpresa: string,
        dtLimite: Date,
        indAtivo: boolean,
        recrutador: Recrutador,
        maxCandidatos?: number
    ) {
        const vaga = new Vaga(
            descricao,
            nomeEmpresa,
            dtLimite,
            indAtivo,
            recrutador,
            maxCandidatos
        );
        vaga._id = id;

        return vaga;
    }
}
