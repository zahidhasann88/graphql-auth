import pool from "../config/database";
import bcrypt from "bcryptjs";

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export class UserModel {
  static async create(userData: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const query = `
      INSERT INTO users (email, password, name)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(query, [
      userData.email,
      hashedPassword,
      userData.name,
    ]);

    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
