import { JwtAdapter } from "../../../shared/util/jwt.adapter";
import { Return } from "../../../shared/util/return.contract";
import { UsuarioRepository } from "../../usuario/database/usuario.repository";

interface LoginParams {
    username: string;
    password: string;
}

export class LoginUsecase {
    public async execute(data: LoginParams): Promise<Return> {
        // 1- verificar se existe usuario com username/senha informados
        const repository = new UsuarioRepository();
        const usuario = await repository.getByUsername(
            data.username,
            data.password
        );

        if (!usuario) {
            return {
                ok: false,
                message: "Username/senha incorretos",
                code: 401,
            };
        }

        // 2- gerar o token JWT
        const token = JwtAdapter.createToken(usuario);

        // 3- retornar o usuario e o token
        return {
            ok: true,
            message: "Login feito com sucesso",
            data: {
                ...usuario,
                token,
            },
            code: 200,
        };
    }
}
