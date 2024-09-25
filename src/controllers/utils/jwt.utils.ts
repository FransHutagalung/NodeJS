import { User } from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()

const accessTokenSecret = process.env.JWT_SECRET!;
const refreshTokenSecret = process.env.JWT_REFRESH!;

// access Token Duration
const accessTokenLife = '1h';  // 1 hour
const refreshTokenLife = '1y';  // 1 year 

// Function generate access token
export const generateAccessToken = (user : User) => {
    return jwt.sign({ id: user.id, username: user.name }, accessTokenSecret, { expiresIn: accessTokenLife });
};

// Function generate refresh token
export const generateRefreshToken = (user : User) => {
    return jwt.sign({ id: user.id, username: user.name }, refreshTokenSecret, { expiresIn: refreshTokenLife });
};