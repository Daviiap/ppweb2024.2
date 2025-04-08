import { NextFunction, Request, Response } from "express";
import JwtUtil from "../../utils/JWTUtil";
import TokenNotProvidedError from "../../errors/TokenNotProvidedError";

export default class AuthMiddleware {
    constructor(private readonly jwtUtil: JwtUtil) { }

    public authenticate = (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            req.body.authInfo = this.jwtUtil.verifyToken(token);
            next();
        } else {
            throw new TokenNotProvidedError(); 
        }
    }

    public allow(_: Request, __: Response, next: NextFunction) {
        next();
    }
}
