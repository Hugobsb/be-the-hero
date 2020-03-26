const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.clear();
    console.log('\n Starting server...');
    console.log('\x1b[31m'+' index.js'+'\x1b[0m'+' listening to port '+'\x1b[33m'+PORT+'\x1b[0m');
    console.log('\x1b[96m'+' http://localhost:'+PORT+'\x1b[0m');
    console.log('\n /**logs**/\n');
});