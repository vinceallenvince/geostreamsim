var SimplexNoise = require("quietriot");
var Utils = require("drawing-utils-lib");

/**
 * Creates a new Place.
 *
 * A Place represents a physical location like a city, town or neighborhood.
 *
 * @param {number} geonameId A unique id representing the place.
 * @param {number} lng Longitude.
 * @param {number} lat Latitude.
 * @param {number} [opt_min] The minimum value.
 * @param {number} [opt_max] The maximum value.
 * @param {number} [opt_volatility] Determines the speed thru the Perlin noise space.
 * @constructor
 */
function Place(geonameId, lng, lat, opt_min, opt_max, opt_volatility) {
	if (!geonameId || !lng || !lat) {
		throw new Error("A Place requires a geonameId, lng, lat and value.");
	}
	this.geonameId = geonameId;
	this.lng = lng;
	this.lat = lat;
	this.min = typeof opt_min !== "undefined" ? opt_min : 0;
	this.max = typeof opt_max !== "undefined" ? opt_max : 100;
	this.val = 0;
	this.volatility = opt_volatility || 0.01;
	this.noiseOffsetX = Math.random() * 10000;
	this.noiseOffsetY = Math.random() * 10000;
	this.count = 0;
}

/**
 * Pulls a number bw -1 and 1 from the Perlin noise space based on the
 * place's count and volatility.
 */
Place.prototype.step = function() {
	this.count++;
	var noise = SimplexNoise.noise(this.noiseOffsetX + this.count * this.volatility,
			this.noiseOffsetY + this.count * this.volatility);
	this.val = Utils.map(noise, -1, 1, this.min, this.max);
};

module.exports = Place;
