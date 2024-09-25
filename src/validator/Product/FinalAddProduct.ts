import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const FinalAddProduct = (req: Request, res: Response, next: NextFunction) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) {
        res.json({
            error: valid.array().map((item) => {
                const validationError: any = item; // Cast item to any
                return {
                    message: validationError.msg ?? "error occurred",
                    field: validationError.param ?? "unknown"
                };
            })
        });
    } else {
        next();
    }
};
