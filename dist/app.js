const express = require('express');
const app = express();
const webpack = require('webpack');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const webpack_config = require('../webpack.dev.config.js')
const compiler = webpack(webpack_config)
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpack_config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(session({
  secret:'keyboardcat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

app.use('/',require('./controllers/'));

app.get('*', (_, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
 });

 passport.serializeUser((user, done) => {
   done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(require('./helpers/localStrategy'));
 app.listen(port);
