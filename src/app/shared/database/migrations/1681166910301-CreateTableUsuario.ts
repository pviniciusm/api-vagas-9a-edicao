import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsuario1681166910301 implements MigrationInterface {
    name = 'CreateTableUsuario1681166910301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."usuario" ("id" character varying NOT NULL, "nome" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "tipo" character varying(1) NOT NULL, "nome_empresa" character varying, "dthr_cadastro" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6ccff37176a6978449a99c82e10" UNIQUE ("username"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vagas"."usuario"`);
    }

}
