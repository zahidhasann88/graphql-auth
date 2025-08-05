import { UserInputError, AuthenticationError } from "apollo-server-express";
import { UserModel } from "../models/User";
import { generateToken } from "../utils/jwt";
import logger from "../utils/logger";

export const authResolvers = {
  Mutation: {
    register: async (_: any, { input }: any) => {
      try {
        const existingUser = await UserModel.findByEmail(input.email);
        if (existingUser) {
          throw new UserInputError("User with this email already exists");
        }

        const user = await UserModel.create(input);
        logger.info(`User registered: ${user.email}`);

        const token = generateToken({
          userId: user.id,
          email: user.email,
        });

        return {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
          },
        };
      } catch (error) {
        logger.error(`Registration failed: ${error}`);
        throw new Error(`Registration failed: ${error}`);
      }
    },

    login: async (_: any, { input }: any) => {
      try {
        const user = await UserModel.findByEmail(input.email);
        if (!user) {
          throw new AuthenticationError("Invalid email or password");
        }

        const isValidPassword = await UserModel.validatePassword(
          input.password,
          user.password
        );
        if (!isValidPassword) {
          throw new AuthenticationError("Invalid email or password");
        }

        const token = generateToken({
          userId: user.id,
          email: user.email,
        });

        logger.info(`User logged in: ${user.email}`);

        return {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
          },
        };
      } catch (error) {
        logger.error(`Login failed: ${error}`);
        throw error;
      }
    },
  },
};
