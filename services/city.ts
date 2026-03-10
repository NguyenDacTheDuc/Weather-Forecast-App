import { pool } from '../config/connectDb';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export const save = async (userId: number, name: string) => {
  const [rows] = await pool.execute<RowDataPacket[]>('select id from city where name = ?', [name]);
  let cityId: number;
  if (rows[0]) {
    cityId = rows[0].id;
  } else {
    const [result] = await pool.execute<ResultSetHeader>('insert into city values (?)', [name]);
    cityId = result.insertId;
  }
  await pool.execute<RowDataPacket[]>('insert into usercity values (?, ?)', [userId, cityId]);
};

export const remove = async (userId: number, cityId: number) => {
  await pool.execute('delete from usercity where userId = ? and cityId = ?', [userId, cityId]);
};

export const get = async (userId: number) => {
  const [rows] = await pool.execute<RowDataPacket[]>('select city.name from city join usercity on city.id = usercity.cityId where usercity.userId = ?', [userId]);
  return rows;
};
