import express from 'express';
const db = require('./db')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// Define routes and middleware here

// db();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.json());


let files = fs.readdirSync('routes');
console.log("FILES >> ", files)
for (const file of files) {
  // if (fs.existsSync(`src/${files[i]}/route.js`)) {
    app.use('/api/v1/', require(`./routes/${file}`));
  }

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});