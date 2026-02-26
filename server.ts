import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import router from './router';
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

app.use('/home', router);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
