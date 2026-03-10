import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import positionRouter from './routers/position';
import searchRouter from './routers/search';
import 'dotenv/config';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(express.static('views'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('position');
});

app.use('/home', positionRouter);
app.use('/search', searchRouter);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
