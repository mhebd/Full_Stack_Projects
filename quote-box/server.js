const app = require('./app.js');
require('dotenv').config({ path : 'config/config.env'});
require('./db/dataBase.js')();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`The server is listenning on ${PORT}...`));