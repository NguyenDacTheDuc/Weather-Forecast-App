import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric&lang=vi`;
  const api = await fetch(url);
  const data = await api.json();
  console.log(data);
  res.render('home', { data });
});

export default router;
