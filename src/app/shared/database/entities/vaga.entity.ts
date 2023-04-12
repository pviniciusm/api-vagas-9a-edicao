import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity("vaga")
export class VagaEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    descricao: string;

    @Column({
        name: "nome_empresa",
    })
    nomeEmpresa: string;

    @Column({
        name: "dt_limite",
    })
    dtLimite: Date;

    @Column({
        name: "ind_ativo",
        default: true,
    })
    indAtivo: boolean;

    @Column({
        name: "max_candidatos",
        nullable: true,
    })
    maxCandidatos?: number;

    @Column({
        name: "id_recrutador",
    })
    idRecrutador: string;

    @ManyToOne(() => UsuarioEntity)
    @JoinColumn({
        name: "id_recrutador",
    })
    recrutador: UsuarioEntity;

    @CreateDateColumn({
        name: "dthr_cadastro",
    })
    dthrCadastro: Date;
}
