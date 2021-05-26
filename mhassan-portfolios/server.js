const mongoose = require('mongoose');
const app = require('./app');
// const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: 'config/config.env' });

const DB_CON_STRING = process.env.DB_CON_STRING.replace(
  '{&PASSWORD&}',
  process.env.DB_PASSWORD
);

const mongConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(DB_CON_STRING, mongConfig).then((doc) => {
  console.log(`DB connection established...`);
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  console.log(`Server is listening on ${PORT}...`);
});
