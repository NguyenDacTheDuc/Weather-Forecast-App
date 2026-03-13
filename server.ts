import express from 'express';
import positionRouter from './routers/position';
import searchRouter from './routers/search';
import registerRouter from './routers/register';
import loginRouter from './routers/login';
import cityRouter from './routers/city';
import session from 'express-session';
import 'dotenv/config';

const app = express();

app.use(express.json()); //Help vs JSON
app.use(express.static('public'));
app.use(express.static('views'));

app.set('view engine', 'ejs');
app.set('views', 'views');

//session config
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? '',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  }),
);
//router
app.get('/', (req, res) => {
  res.render('position');
});
app.use('/home', positionRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/city', cityRouter);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
