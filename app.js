'use strict';

const express    = require('express');        
const app        = express();                
const logger     = require('morgan');
const router     = express.Router();
const config     = require('./config')
const port       = process.env.PORT || config.PORT;

app.use(logger('dev'));

require('./routes')(router);
app.use('/', router);

app.listen(port);

console.log(`App Runs on ${port}`);