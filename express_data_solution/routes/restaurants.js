'use strict'
var request     = require('request');
var express     = require('express');
var restaurants = express.Router();

var restaurantRemoteData = 'https://data.cityofnewyork.us/resource/43nn-pn8j.json'


restaurants.get('/', function(req, res) {
  request.get(restaurantRemoteData, parseData.bind(res) )
});

restaurants.get('/:zip', (req,res)=>{
  req.query.zipcode = req.params.zip;
  request.get({url:restaurantRemoteData, qs:req.query}, parseData.bind(res) )
})

module.exports = restaurants;


/*--------------*/

function parseData( err,res,body){
  var data = JSON.parse(body)
 	
 	/* filter things by grade*/
 	// .filter(el=>el.grade !== 'A')
 	
 	// sort by recordDate
 	.sort( (a,b) => {

 		// This is called a comparator function.
 		// It tells the sorter how to compare the items:
 		// (a<b)  => -1
 		// (a>b)  => 1
 		// (a==b) => 0

    // lets always present in reverse order
    var d2 = new Date(a.inspection_date);
 		var d1 = new Date(b.inspection_date);
 		
 		// they're in order, no swapping
 		if(d1<d2) return -1

 		// if they're out of order, swap 'em
 		if(d1>d2) return 1
 		
 		// we can't really tell if two times are equal because they're two different objects	
 		return 0
 	}) 

 	/* group the records by establishment */
 	.reduce( (p,c)=>{

 		// camis is the establishment ID
		if( !(c.camis in p) ) p[c.camis] = []
		p[c.camis].push(c)
		return p

 	},{})
  this.send(data)
 }
