import { Candidato } from "../../../models/candidato.model";
import { Candidatura } from "../../../models/candidatura.model";
import { Vaga } from "../../../models/vaga.model";
import { Return } from "../../../shared/util/return.contract";

export class AplicacaoValidator {
    public static candidaturaDuplicada(candidatos: Candidatura[], id: string) {
        if (candidatos.some((candidatura) => candidatura.candidato.id === id)) {
            return true;
        }

        return false;
    }

    public static validateVaga(vaga: Vaga): Return {
        if (vaga.dtLimite < new Date()) {
            return {
                ok: false,
                code: 400,
                message: "A data limite já foi alcançada",
            };
        }
        if (vaga.indAtivo === false) {
            return {
                ok: false,
                code: 400,
                message: "A vaga não está mais ativa.",
            };
        }

        return {
            ok: true,
            code: 200,
            message: "Done",
        };
    }
}
