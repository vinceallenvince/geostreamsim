var Place = require('../src/place');
var expect = require('expect');
var sinon = require('sinon');

var place;

beforeEach(function(){
	
});

describe('Place', function() {

  it("should have required properties.", function() {
    var fn = function() { place = new Place(); };
    expect(fn).toThrow();

    var fn = function() { place = new Place(1000); };
    expect(fn).toThrow();

    var fn = function() { place = new Place(1000, -24.999); };
    expect(fn).toThrow();

    var fn = function() { place = new Place(1000, -24.999, 14.098); };
    expect(fn).toNotThrow();
    expect(place.geonameId).toEqual(1000);
    expect(place.lng).toEqual(-24.999);
    expect(place.lat).toEqual(14.098);
    expect(place.min).toEqual(0);
    expect(place.max).toEqual(100);
    expect(place.volatility).toEqual(0.01);

    place = new Place(1000, -24.999, 14.098, 100, 500, 0.1);
    expect(place.min).toEqual(100);
    expect(place.max).toEqual(500);
    expect(place.volatility).toEqual(0.1);
  });

  it("should have a method that updates its val property.", function() {
    var min = 100, max = 200;
    place = new Place(1000, -24.999, 14.098, min, max);
    place.step();
    expect(place.count).toEqual(1);
    for (var i = 0; i < 200; i++) {
      place.step()
      expect(place.val).toBeGreaterThan(min);
      expect(place.val).toBeLessThan(max);
    }
    expect(place.count).toEqual(201);
  });

});