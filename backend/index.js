const express = require('express');
const http = require('http');
const app = express();
const port = 9000;
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes');

app.use(cors());

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

route(app);

http.createServer(app);

app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
});