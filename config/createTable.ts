import { pool } from './connectDb';

(async () => {
  try {
    await pool.execute(`
      CREATE TABLE user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL
      )
    `);

    await pool.execute(`
      CREATE TABLE city (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL
      )
    `);

    await pool.execute(`
      CREATE TABLE userCity (
        userId INT,
        cityId INT,
        PRIMARY KEY (userId, cityId),
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (cityId) REFERENCES city(id) ON DELETE CASCADE
      )
    `);

    console.log('Create tables success');
  } catch (err) {
    console.error('Create tables errors', err);
  }
})();
