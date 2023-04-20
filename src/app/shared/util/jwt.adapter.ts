import jwt from "jsonwebtoken";
import { authEnv } from "../../envs/auth.env";

export class JwtAdapter {
    public static createToken(data: any) {
        return jwt.sign(data, authEnv.secret!, {
            expiresIn: -10,
        });
    }

    public static checkToken(token: string) {
        return jwt.verify(token, authEnv.secret!);
    }
}
