
/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

var assert = require("should");
var Frames = require("../scripts/game/frames.js");
var Game = require("../scripts/game/game.js");
var LastRound = require("../scripts/game/lastRound.js");
var NormalRound = require("../scripts/game/normalRound.js");
var Spare = require("../scripts/game/spare.js");
var Strike = require("../scripts/game/strike.js");
var $ = require("../scripts/helpers/assertions.js");


describe('kata-bowling-game', function(){
	var frames = new Frames();


	describe('#points()', function(){
		beforeEach(function(){
			frames.clear();
		});

		it("should get the sum of the two rolls when its a NormalRound", function(){
			frames = frames = Game.build([ 
				[2,5],
				[1,8],
				[9,0],
				[0,8],
				[0,0] ]).frames;

			$.assertAllRoundsPoints(frames,[7,9,9,8,0]);
		});

		it("should get the sum of the two rolls plus the next one when its a Spare", function(){
			frames = frames = Game.build([ 
				[5,5],
				[0,10],
				[0,9],
				[2,8],
				[10] ]).frames;

			$.assertAllRoundsPoints(frames,[10,10,9,20,10]);
		});

		it("should get 20 when there is a Spare and then a Strike", function(){
			frames = frames = Game.build([ 
				[0,10],
				[10] ]).frames;

			$.assertAllRoundsPoints(frames,[20,10]);
		});

		it("should get the sum of the the strike plus the next two balls when its a Strike", function(){
			frames = frames = Game.build([ 
				[10],
				[0,10],
				[10],
				[10],
				[10],
				[10] ]).frames;

			$.assertAllRoundsPoints(frames,[20,20,30,30,20,10]);
		});

		it("should sum 60 if the last round are all strikes", function(){
			var last = new LastRound(null, null, 10,10,10);
			last.points().should.equal(30);
		});


		it("should sum 11 if the last round is a spare plus 1", function(){
			var last = new LastRound(null, null, 2,8,1);
			last.points().should.equal(11);
		});
	});
});