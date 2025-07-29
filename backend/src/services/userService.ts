import pool from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export class UserService {
  static async createUser(userData: CreateUserData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?)',
      [
        userData.email,
        hashedPassword,
        userData.first_name,
        userData.last_name,
        userData.phone
      ]
    );

    const [users] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [(result as any).insertId]
    );

    const user = (users as any[])[0];
    delete user.password;
    return user;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const users = rows as any[];
    return users.length > 0 ? users[0] : null;
  }

  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT id, email, first_name, last_name, phone, created_at FROM users WHERE id = ?',
      [id]
    );

    const users = rows as any[];
    return users.length > 0 ? users[0] : null;
  }

  static async validatePassword(user: User & { password: string }, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  static generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
  }

  static async updateUser(id: number, updateData: Partial<CreateUserData>): Promise<User | null> {
    const fields = [];
    const values = [];

    if (updateData.first_name) {
      fields.push('first_name = ?');
      values.push(updateData.first_name);
    }
    if (updateData.last_name) {
      fields.push('last_name = ?');
      values.push(updateData.last_name);
    }
    if (updateData.phone) {
      fields.push('phone = ?');
      values.push(updateData.phone);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }
} 