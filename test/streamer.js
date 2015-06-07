var Streamer = require("../src/streamer");
var Place = require("../src/place");
var expect = require("expect");
var sinon = require("sinon");
var cities = require("../src/cities");

var streamer;

beforeEach(function(){
	streamer = new Streamer();
});

describe("Streamer", function() {

  it("should have a method to return a number within a range.", function () {
    var bnds = Streamer.boundsLng;
    for (var i = 0; i < 1000; i++) {
      expect(streamer.randomNumInRange(bnds)).toBeGreaterThan(bnds[0]);
      expect(streamer.randomNumInRange(bnds)).toBeLessThan(bnds[1]);
    }

    var bnds = Streamer.boundsLat;
    for (var i = 0; i < 1000; i++) {
      expect(streamer.randomNumInRange(bnds)).toBeGreaterThan(bnds[0]);
      expect(streamer.randomNumInRange(bnds)).toBeLessThan(bnds[1]);
    }
  });

  it("should have a method to create places.", function() {
    streamer.createPlaces();
    expect(streamer.places.length).toEqual(cities.length);
    expect(streamer.places[0] instanceof Place).toBe(true);
  });

  it("should have a method that starts an interval.", function() {
    streamer.start();
    expect(streamer.intervalId).toNotEqual(null);
    streamer.stop();
  });

});

