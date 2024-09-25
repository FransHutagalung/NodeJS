import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncMiddleware = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};