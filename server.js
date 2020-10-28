// for require dotenv
// require('dotenv').config();

const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      port           = process.env.PORT || 3000,
      dbUrl          = process.env.DATABASEURL,
      methodOverride = require('method-override'),
      productRoutes  = require('./api/routes/product'),
      categoryRoutes = require('./api/routes/category'),
      indexRoutes    = require('./api/routes/index');

mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true})
    .catch(error => console.log(error.reason));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use(indexRoutes);

app.listen(port, process.env.IP, () => console.log('listening on port: ' + port));
