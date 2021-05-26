const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const error = require('./middleware/error');

const homeRouter = require('./routes/homeRoutes');
const animalsRouter = require('./routes/animalsRoutes');
const aboutRouter = require('./routes/aboutRoutes');
const contactRouter = require('./routes/contactRoutes');
const postAnimalRouter = require('./routes/postAnimalRoutes');
const signupRouter = require('./routes/signupRoutes');
const loginRouter = require('./routes/loginRoutes');
const userRouter = require('./routes/userRoutes');
const editProfileRouter = require('./routes/editProfileRoutes');
const updateAnimalRouter = require('./routes/updateAnimalRoutes');
const logoutRouter = require('./routes/logoutRoutes');
const searchRouter = require('./routes/searchRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/animals', animalsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/post-animal', postAnimalRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/update-animal', updateAnimalRouter);
app.use('/logout', logoutRouter);
app.use('/search', searchRouter);

app.use(error);

module.exports = app;
