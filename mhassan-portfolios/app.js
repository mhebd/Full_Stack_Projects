const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const path = require('path');
//==============================
const error = require('./middleware/errors');
const portfolioRouter = require('./routes/portfolioRoutes');
const socialRouter = require('./routes/socialRoutes');
const cpanelRouter = require('./routes/cpanelRoutes');

const homeRouter = require('./routes/homeRoutes');
const getPortfolioRouter = require('./routes/getPortfolioRoutes');
const loginRouter = require('./routes/loginRoutes');
const logoutRouter = require('./routes/logoutRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/c-panel', cpanelRouter);
app.use('/c-panel/portfolio', portfolioRouter);
app.use('/c-panel/social', socialRouter);

app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/portfolios', getPortfolioRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use(error);

module.exports = app;
