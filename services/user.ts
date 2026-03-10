import { pool } from '../config/connectDb';
import bcrypt from 'bcrypt';
import type { RowDataPacket } from 'mysql2';

export const register = async (username: string, password: string) => {
  const [rows] = await pool.execute<RowDataPacket[]>('select id from user where username = ?', [username]);
  if (rows[0]) throw new Error('Tên tài khoản này đã tồn tại');
  const hashPassword = await bcrypt.hash(password, 10);
  await pool.execute<RowDataPacket[]>('insert into user(username, password) values (?, ?)', [username, hashPassword]);
};

export const login = async (username: string, password: string) => {
  const [rows] = await pool.execute<RowDataPacket[]>('select id from user where username = ?', [username]);
  if (!rows[0]) throw new Error('Tài khoản này không tồn tại');
  const match = await bcrypt.compare(password, rows[0].password);
  if (!match) throw new Error('Sai mật khẩu');
  return rows[0];
};

export const changePassword = async (id: number, password: string, newPassword: string) => {
  const [rows] = await pool.execute<RowDataPacket[]>('select id  from user where id = ?', [id]);
  if (rows[0]) {
    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) throw new Error('Sai mật khẩu cũ');
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute<RowDataPacket[]>('update user set password = ? where id = ?', [hashPassword, id]);
  }
};
