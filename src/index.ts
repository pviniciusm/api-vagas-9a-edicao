import { TypeormConnection } from "./main/database/typeorm.connection";
import { Server } from "./main/server/express.server";

TypeormConnection.init().then(Server.run);
