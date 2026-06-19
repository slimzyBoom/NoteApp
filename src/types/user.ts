import { IAuthPayload } from "./auth";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload;
    }
  }
}

export interface IUser {
  username: string;
  email: string;
  password: string;
}
