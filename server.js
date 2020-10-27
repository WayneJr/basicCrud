// for require dotenv

const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      port       = process.env.PORT || 3000,
      dbUrl      = process.env.DATABASEURL,
      router     = require('./api/router');


app.use(bodyParser.urlencoded({extended: true}));

router(app);

app.listen(port, process.env.IP, () => console.log('listening on port: ' + port));
