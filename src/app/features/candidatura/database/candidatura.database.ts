import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Candidatura } from "../../../models/candidatura.model";
import { CandidaturaEntity } from "../../../shared/database/entities/candidatura.entity";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";
import { VagaRepository } from "../../vaga/database/vaga.repository";

export class CandidaturaRepository {
    private repository =
        TypeormConnection.connection.getRepository(CandidaturaEntity);
    public async list(idVaga: string) {
        const result = await this.repository.find({
            where: {
                idVaga,
            },
            relations: ["candidato", "vaga"],
        });

        console.log(result);

        return result.map((item) => this.mapEntityToModel(item));
    }
    public mapEntityToModel(entity: CandidaturaEntity): Candidatura {
        const candidato = UsuarioRepository.mapEntityToModel(entity.candidato);
        const vaga = VagaRepository.mapEntityToModel(entity.vaga);
        return Candidatura.create(
            entity.id,
            entity.dtCadastro,
            entity.indSucesso,
            candidato,
            vaga
        );
    }

    public async create(candidatura: Candidatura) {
        const entity = this.repository.create({
            id: candidatura.id,
            dtCadastro: candidatura.dtCadastro,
            indSucesso: candidatura.indSucesso,
            idCandidato: candidatura.candidato.id,
            idVaga: candidatura.vaga.id,
        });

        await this.repository.save(entity);
    }
}
