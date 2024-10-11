import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IVerificationToken {
  sub: string;
}

export function isLogged(req: Request, res: Response, next: NextFunction) {
  const loggedToken = req.headers.authorization;

  if (!loggedToken) {
    return res
      .status(401)
      .json({
        status: 401,
        message:
          "Solicitação falhou, essa solicitação necessita do token de autorização.",
      })
      .end();
  }

  const [, token] = loggedToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IVerificationToken;
    req.user_id = sub;
    console.log("-Middleware de verificação de token concluído");
  } catch (err) {
    res
      .status(401)
      .json({
        status: 401,
        message:
          "Solicitação falhou, ocorreu algum error no middleware de verificação de token",
      })
      .end();
  }

  return next()
}
