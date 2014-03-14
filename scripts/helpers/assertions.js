/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

var assert = require("should");
var Game = require("../game/game.js");
var LastRound = require("../game/lastRound.js");
var NormalRound = require("../game/normalRound.js");
var Spare = require("../game/spare.js");
var Strike = require("../game/strike.js");
var _ = require("lodash");

function assertRoundClass(frames, pos, Class) {
	frames.rounds[pos].should.be.an.instanceOf(Class);
}

function assertRound(frames, pos, array, Class) {
	assertRoundClass(frames, pos, Class);
	frames.rounds[pos].toArray().should.be.eql(array);
}


function forAllRounds(fn) {
	return function(frames, array){
		var len = array.length;
		len.should.equal(frames.rounds.length);

		for(var i=0; i<len; i++) {
			fn(frames, array, i);
		}
	};
}

function assertRoundPoints(frames, pos, points) {
	frames.rounds[pos].points().should.equal(points);
}


module.exports.assertRoundClass = assertRoundClass;
module.exports.assertRound = assertRound;
module.exports.assertAllRoundsClasses = forAllRounds(function(frames, array, pos) {
	assertRoundClass(frames, pos, array[pos]);
});

module.exports.assertAllRounds = forAllRounds(function(frames, array, pos) {
	assertRound(frames, pos, array[pos].slice(1), array[pos][0]);
});

module.exports.assertRoundPoints = assertRoundPoints;
module.exports.assertAllRoundsPoints = function(frames, points){
	_.map(frames.rounds, function(elem){
		return elem.points();
	}).should.be.eql(points);
};