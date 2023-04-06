import { DataSource } from "typeorm";
import { databaseEnv } from "../../app/envs/database.env";

export default new DataSource({
    type: "postgres",
    host: databaseEnv.host,
    username: databaseEnv.username,
    password: databaseEnv.password,
    database: databaseEnv.database,
    schema: "vagas",
    synchronize: false,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: ["src/app/shared/database/entities/**/*.ts"],
    migrations: ["src/app/shared/database/migrations/**/*.ts"],
});
