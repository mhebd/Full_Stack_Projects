const app = require('./app.js');
const dotenv = require('dotenv');
const { initialDB } = require('./db/dataBase.js');

dotenv.config({ path : './config/config.env' });

initialDB();

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`))