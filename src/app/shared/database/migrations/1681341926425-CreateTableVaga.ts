import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableVaga1681341926425 implements MigrationInterface {
    name = 'CreateTableVaga1681341926425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."vaga" ("id" character varying NOT NULL, "descricao" character varying NOT NULL, "nome_empresa" character varying NOT NULL, "dt_limite" TIMESTAMP NOT NULL, "ind_ativo" boolean NOT NULL DEFAULT true, "max_candidatos" integer, "id_recrutador" character varying NOT NULL, "dthr_cadastro" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8fc4878a1eec234441d6696c3cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" ADD CONSTRAINT "FK_f0d9366b1d9aa1f307cfdfdac6b" FOREIGN KEY ("id_recrutador") REFERENCES "vagas"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."vaga" DROP CONSTRAINT "FK_f0d9366b1d9aa1f307cfdfdac6b"`);
        await queryRunner.query(`DROP TABLE "vagas"."vaga"`);
    }

}
