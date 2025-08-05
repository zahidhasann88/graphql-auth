import { AuthenticationError } from "apollo-server-express";
import { verifyToken } from "../utils/jwt";
import { UserModel } from "../models/User";

export interface Context {
  user?: any;
}

export const getUser = async (req: any): Promise<any> => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.userId);
    return user;
  } catch (error) {
    return null;
  }
};

export const requireAuth = (user: any) => {
  if (!user) {
    throw new AuthenticationError(
      "You must be logged in to perform this action"
    );
  }
};
