import 'babel-polyfill';
import express from 'express'
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import config from './db/config';
import Strategies from './helpers/localStrategy';
import Controllers from './controllers/index';
import webpack from 'webpack'
import webpack_config from '../webpack.dev.config.js'
import webpack_dev_middleware from'webpack-dev-middleware'
import webpack_hot_middleware from'webpack-hot-middleware'
import path from 'path';

const compiler = webpack(webpack_config)
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(webpack_dev_middleware(compiler, {
  noInfo: true,
  publicPath: webpack_config.output.publicPath
}));

app.use(webpack_hot_middleware(compiler));

app.use(session({
  secret:'keyboardcat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));
app.use('/', Controllers);

app.get('*', (_, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
 });

passport.serializeUser((user, done) => {
 done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(Strategies);

app.listen(config.port, () => console.log(`App listening on port # ${config.port}`));