import { requireAuth } from "../middleware/auth";
import logger from "../utils/logger";

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      requireAuth(user);
      logger.info(`Profile accessed by: ${user.email}`);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      };
    },

    users: async (_: any, __: any, { user }: any) => {
      requireAuth(user);
      const query = "SELECT id, email, name, created_at FROM users";
      const pool = require("../config/database").default;
      const result = await pool.query(query);
      logger.info(`Users list accessed by: ${user.email}`);
      return result.rows;
    },
  },
};
