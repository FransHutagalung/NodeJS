import { NextFunction, Request, Response } from "express";
import { notAuthorisation } from "../../exceptions/notAuthorisation";
import { ErrorCode } from "../../exceptions/exception";
import * as jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { prismaClient } from "../../prismaRender";

interface AuthRequest extends Request {
    user?: User;
}

export const authMiddlware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new notAuthorisation("Unauthorized", ErrorCode.UNAUTHORIZED, 401, null);
        }

        const payload = jwt.verify(authorization, process.env.JWT_SECRET as string) as any;

        const user = await prismaClient.user.findFirst({
            where: {
                id: payload.id,
            },
        });

        if (!user) {
            throw new notAuthorisation("Unauthorized", ErrorCode.UNAUTHORIZED, 401, null);
        }

        req.user = user;
        return next();
    } catch (error) {
        // Periksa apakah error adalah 'TokenExpiredError'
        if (error instanceof jwt.TokenExpiredError) {
            return next(
                new notAuthorisation("Token expired", ErrorCode.UNAUTHORIZED, 401, null)
            );
        }

        return next(error);
    }
};
