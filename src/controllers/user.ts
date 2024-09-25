import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../prismaRender";

export class User {
    updateUserAddres = async (req: Request, res: Response, next: NextFunction) => {
        const { id, shippingAddress, billingAddres } = req.body;

        try {
            const user = await prismaClient.user.findFirstOrThrow({
                where: { id },
                select: { id: true },
            });

            const [shippingAddr, billingAddr] = await Promise.all([
                prismaClient.addres.findFirstOrThrow({ where: { id: shippingAddress } }),
                prismaClient.addres.findFirstOrThrow({ where: { id: billingAddres } }),
            ]);

            const updateUser = await prismaClient.user.update({
                where: { id: user.id },
                data: {
                    shippingId: shippingAddr.id,
                    billingId: billingAddr.id,
                },
            });

            res.status(200).json({
                message: "User updated successfully",
                data: updateUser,
            });
        } catch (error: any) {
            if (error.code === "P2025") {
                return res.status(404).json({
                    message: error.message.includes("Address") ? "Address not found" : "User not found",
                });
            }
            next(error);
        }
    }
}
