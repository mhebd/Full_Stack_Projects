const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const colors = require('colors');

dotenv.config({ path: './config/config.env' });

const conString = process.env.DB_CON_STRING.replace(
  '{&PASSWORD&}',
  process.env.DB_PASSWORD
);

const mongConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(conString, mongConfig).then((doc) => {
  console.log(`DB Connection established...`);
});

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  console.log(`Server is listening on ${PORT}...`);
});
