const express = require('express');
const path = require('path');
const errorMW = require('./middleware/error');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const imageRouter = require('./routes/imageRoutes');
const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/homeRoutes');
const singleRouter = require('./routes/singleRoutes');
const singleUserRouter = require('./routes/singleUserRoutes');
const editProfileRouter = require('./routes/editProfileRoutes');
const signupRouter = require('./routes/signupRoutes');
const loginRouter = require('./routes/loginRoutes');
const logoutRouter = require('./routes/logoutRoutes');
const likeRouter = require('./routes/likeRoutes');
const createImageRouter = require('./routes/createImageRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compression());

app.use('/api/v1/images', imageRouter);
app.use('/api/v1/users', userRouter);

app.use('/', homeRouter);
app.use('/image', singleRouter);
app.use('/user', singleUserRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/newimage', createImageRouter);
app.use('/image/like', likeRouter);

app.use(errorMW);

module.exports = app;
