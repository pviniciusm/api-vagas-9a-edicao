import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { VagaEntity } from "./vaga.entity";
import { UsuarioEntity } from "./usuario.entity";

@Entity("candidatura")
export class CandidaturaEntity {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn({
        name: "dt_cadastro",
    })
    dtCadastro: Date;

    @Column({
        name: "ind_sucesso",
        default: false,
    })
    indSucesso: boolean;

    @Column({
        name: "id_candidato",
    })
    idCandidato: string;

    @Column({
        name: "id_vaga",
    })
    idVaga: string;

    @ManyToOne(() => VagaEntity)
    @JoinColumn({
        name: "id_vaga",
    })
    vaga: VagaEntity;

    @ManyToOne(() => UsuarioEntity)
    @JoinColumn({
        name: "id_candidato",
    })
    candidato: UsuarioEntity;
}
