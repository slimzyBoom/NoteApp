import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthPayload } from "../types/auth";

const SECRET_KEY = process.env.JWT_SECRET as string;

// export interface AuthInterface<P = ParamsDictionary> extends Request {
//   user?: IAuthPayload;
// }

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided. " });
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as IAuthPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
