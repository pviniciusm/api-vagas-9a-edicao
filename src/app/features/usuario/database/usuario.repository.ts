import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { TipoUsuario, Usuario } from "../../../models/usuario.model";
import { UsuarioEntity } from "../../../shared/database/entities/usuario.entity";

export class UsuarioRepository {
    private repository =
        TypeormConnection.connection.getRepository(UsuarioEntity);

    public async getByUsername(username: string): Promise<Usuario | null> {
        const result = await this.repository.findOneBy({
            username,
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    public async create(usuario: Usuario) {
        const usuarioEntity = this.repository.create({
            id: usuario.id,
            nome: usuario.nome,
            username: usuario.username,
            nomeEmpresa: usuario.nomeEmpresa,
            password: usuario.password,
            tipo: usuario.tipo,
        });

        const result = await this.repository.save(usuarioEntity);
        return this.mapEntityToModel(result);
    }

    public async list(tipo?: TipoUsuario) {
        const result = await this.repository.findBy({
            tipo,
        });

        return result.map((item) => this.mapEntityToModel(item));
    }

    private mapEntityToModel(entity: UsuarioEntity): Usuario {
        return Usuario.create(
            entity.id,
            entity.nome,
            entity.username,
            entity.password,
            entity.tipo,
            entity.nomeEmpresa
        );
    }
}
