require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const openAPIDocumentation = require('./swagger_output.json');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: process.env.SENTRY_ENV,
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static('./public'));
const http = require('http').createServer(app);
http.allowEIO3 = true;

const fs = require('fs');

app.use(express.json());
// app.use(cors({origin: "*"}));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIDocumentation));

let files = fs.readdirSync('src/modules');
for (let i in files) {
  if (fs.existsSync(`src/modules/${files[i]}/route.js`)) {
    app.use(`/api/v1`, require(`./modules/${files[i]}/route`));
  }
}

// app.use(errorHandler);

// const io = require('socket.io')(http, {
//   cors: {
//     origin: '*',
//   },
// });

const PORT = process.env.PORT || 5001;
http.listen(
  PORT,
  // eslint-disable-next-line no-console
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`),
);
