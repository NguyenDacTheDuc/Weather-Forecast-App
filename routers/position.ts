import express from 'express';
import 'dotenv/config';
import { get } from '../services/city';

const router = express.Router();

export default router.get('/', async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric&lang=vi`;
  const api = await fetch(url);
  const data = await api.json();
  const user = (req.session as any).user || null;
  const cities = user ? await get(user.id) : [];
  console.log(data);
  res.render('home', { data, user: (req.session as any).user || null, cities });
});
