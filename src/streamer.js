var Utils = require("drawing-utils-lib");
var Place = require("./place");
var cities = require("./cities");

/**
 * Creates a new Streamer.
 *
 * A Streamer creates a set of fake places and emits messages
 * meant to simulate a data stream describing activity at each place.
 *
 * @param {Object} io An instance of socket.io.
 * @param {number} opt_totalPlaces The total places to simulate.
 * @param {number} opt_intervalDuration The time in milliseconds between data emission.
 * @constructor
 */
function Streamer(io, opt_totalPlaces, opt_intervalDuration) {
	this.io = io;
	this.totalPlaces = opt_totalPlaces < cities.length ? opt_totalPlaces : cities.length;
	this.places = [];
	this.intervalId = null;
	this.intervalDuration = opt_intervalDuration || 1000;
}

Streamer.boundsGeoNameId = [10000, 99999];
Streamer.boundsLng = [-124.8489, -67.8854];
Streamer.boundsLat = [24.3963, 49.3843];

Streamer.prototype.start = function() {
	if (this.places.length === 0) {
		this.createPlaces();
	}
	this.intervalId = setInterval(this.emit.bind(this), this.intervalDuration);
};

Streamer.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Streamer.prototype.randomNumInRange = function(range) {
	return Utils.map(Math.random(), 0, 1, range[0], range[1]);
};

Streamer.prototype.createPlaces = function() {
	for (var i = 0; i < this.totalPlaces; i++) {
		var maxVal = Utils.map(cities[i].pop, cities[cities.length - 1].pop, cities[0].pop, 50, 100);
		this.places.push(new Place(
			cities[i].geonameId, // geonameId
			cities[i].lng,
			cities[i].lat,
			0, // minVal
			Utils.map(Math.random(), 0, 1, 0, maxVal), // maxVal
			Utils.map(Math.random(), 0, 1, 0.001, 0.01) // volatility
		));
	}
};

Streamer.prototype.emit = function() {
	var l = this.places.length;
	for (var i = 0; i < l; i++) {
		var place = this.places[i];
		place.step();
		this.io.emit("msg", {
			"geonameId": place.geonameId,
			"lat": place.lat,
			"lng": place.lng,
			"val": place.val
		});
	}
};

module.exports = Streamer;
