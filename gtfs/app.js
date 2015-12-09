var express = require('express');
var gtfs = require('gtfs');
var app = express();

app.get('/', function(req, res, next) {
	res.send('GTFS Web API');
});

app.get('/agencies/', function(req, res, next) {
	gtfs.agencies(function(e, agencies) {
		res.json(agencies);
	});
});

app.get('/agencies/:lat/:lon/:radius', function(req, res, next) {
	var lat = req.params.lat;
	var lon = req.params.lon;
	var radius = req.params.radius;

	if(isNaN(lat)){
		res.status(400).json({message: 'bad param (lat)'});
		return;
	}
	if(isNaN(lon)){
		res.status(400).json({message: 'bad param (lon)'});
		return;
	}
	if(isNaN(radius)){
		res.status(400).json({message: 'bad param (radius)'});
		return;
	}

	gtfs.getAgenciesByDistance(lat, lon, radius, function(err, agencies) {
		res.json(agencies);
	});
});

app.get('/agency/:agency_key', function(req, res, next) {
	var agency_key = req.params.agency_key;
	
	gtfs.getAgency(agency_key, function(err, agency) {
		res.json(agency);
	});
});

app.get('/routes/:agency_key', function(req, res, next) {
	var agency_key = req.params.agency_key;
	
	gtfs.getRoutesByAgency(agency_key, function(err, routes) {
		res.json(routes);
	});
});

app.get('/routes/:agency_key/:route_id', function(req, res, next) {
	var agency_key = req.params.agency_key;
	var agency_key = req.params.route_id;
	
	gtfs.getRoutesById(agency_key, route_id, function(err, routes) {
		res.json(routes);
	});
});

app.get('/routes/:lat/:lon/:radius', function(req, res, next) {
	var lat = req.params.lat;
	var lon = req.params.lon;
	var radius = req.params.radius;

	if(isNaN(lat)){
		res.status(400).json({message: 'bad param (lat)'});
		return;
	}
	if(isNaN(lon)){
		res.status(400).json({message: 'bad param (lon)'});
		return;
	}
	if(isNaN(radius)){
		res.status(400).json({message: 'bad param (radius)'});
		return;
	}
	
	gtfs.getRoutesByDistance(lat, lon, radius, function(err, routes) {
		res.json(routes);
	});
});

app.listen(8080);