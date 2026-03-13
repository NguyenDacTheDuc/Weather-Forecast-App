import express from 'express';
import { get } from '../services/city';
import 'dotenv/config';

const router = express.Router();

export default router.get('/', async (req, res) => {
  const name = req.query.name;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${process.env.API_KEY}&units=metric&lang=vi`;
  const api = await fetch(url);
  const data = await api.json();
  const user = (req.session as any).user || null;
  const cities = user ? await get(user.id) : [];
  console.log(data);
  res.render('home', { data, user: (req.session as any).user || null, cities });
});
