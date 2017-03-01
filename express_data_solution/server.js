'use strict'
var request   = require('request');
var express 	= require('express');
var logger 		= require('morgan');
var restaurants = require('./routes/restaurants');
var app = express();


app.use(logger('dev'));
app.use( express.static('public') );
// set up a route to restaurants
app.use( '/restaurants', restaurants )

app.listen(3000, function () {
  console.log('servers running captain!')
});

app.get('/search',(req,res)=>
  res.sendfile('restaurantSearch.html', {root: './public'})
)


