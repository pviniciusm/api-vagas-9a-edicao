import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Vaga } from "../../../models/vaga.model";
import { VagaEntity } from "../../../shared/database/entities/vaga.entity";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

export class VagaRepository {
    private repository = TypeormConnection.connection.getRepository(VagaEntity);

    public async create(vaga: Vaga) {
        const vagaEntity = this.repository.create({
            id: vaga.id,
            descricao: vaga.descricao,
            nomeEmpresa: vaga.nomeEmpresa,
            dtLimite: vaga.dtLimite,
            idRecrutador: vaga.recrutador.id,
            indAtivo: vaga.indAtivo,
            maxCandidatos: vaga.maxCandidatos,
        });

        await this.repository.save(vagaEntity);
    }

    public async list() {
        const result = await this.repository.find({
            relations: ["recrutador"],
        });

        return result.map((item) => VagaRepository.mapEntityToModel(item));
    }

    public async get(id: string) {
        const result = await this.repository.findOne({
            where: {
                id,
            },
            relations: ["recrutador"],
        });

        if (result === null) {
            return null;
        }

        return VagaRepository.mapEntityToModel(result);
    }

    public static mapEntityToModel(entity: VagaEntity): Vaga {
        const recrutador = UsuarioRepository.mapEntityToModel(
            entity.recrutador
        );

        const vaga = Vaga.create(
            entity.id,
            entity.descricao,
            entity.nomeEmpresa,
            entity.dtLimite,
            entity.indAtivo,
            recrutador,
            entity.maxCandidatos
        );

        return vaga;
    }
}
