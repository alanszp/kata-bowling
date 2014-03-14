/* jshint expr: true, node: true */
/* global describe, it, beforeEach */
"use strict";

var assert = require("should");
var Frames = require("../scripts/game/frames.js");
var Game = require("../scripts/game/game.js");
var NullRound = require("../scripts/game/nullRound.js");
var LastRound = require("../scripts/game/lastRound.js");
var NormalRound = require("../scripts/game/normalRound.js");
var Spare = require("../scripts/game/spare.js");
var Strike = require("../scripts/game/strike.js");
var $ = require("../scripts/helpers/assertions.js");



describe('kata-bowling-frames', function(){
	var frames = new Frames();

	describe('#get()', function(){
		beforeEach(function(){
			frames.clear();
		});

		it("should get a NullRound when get an empty position of an empty array", function(){
			frames.get(0).should.be.an.instanceOf(NullRound);
			frames.get(10).should.be.an.instanceOf(NullRound);
			frames.get(4).should.be.an.instanceOf(NullRound);
			frames.get(215).should.be.an.instanceOf(NullRound);
		});

		it("should get a NullRound when the frames are half-filled and get an empty position", function(){
			frames = Game.build([ 
				[5,5],
				[2,8],
				[10],
				[0,8] ]).frames;

			frames.get(4).should.be.an.instanceOf(NullRound);
			frames.get(9).should.be.an.instanceOf(NullRound);
			frames.get(10).should.be.an.instanceOf(NullRound);
			frames.get(433).should.be.an.instanceOf(NullRound);			
		});

		it("should get all the rounds correctly", function(){
			frames = Game.build([ 
				[5,5],
				[2,8],
				[10],
				[0,8] ]).frames;
		
			$.assertAllRounds(frames, [
				[Spare,5,5],
				[Spare,2,8],
				[Strike,10,0],
				[NormalRound, 0,8] ]);
		});
	});
	
	describe('#nextRollValue()', function(){		
		it("should return the value of the first roll from the next round", function() {
			frames = Game.build([ 
				[5,5],
				[2,8],
				[10],
				[0,8] ]).frames;
			frames.nextRollValue(0).should.be.equal(2);
			frames.nextRollValue(1).should.be.equal(10);
			frames.nextRollValue(2).should.be.equal(0);
		});



		it("should return 0 when it's the las round", function() {
			frames = Game.build([ 
				[5,5],
				[2,8],
				[10],
				[0,8] ]).frames;
			frames.nextRollValue(3).should.be.equal(0);
		});  

		it("should return 0 when frames is empty", function() {
			frames = Game.build([  ]).frames;
			frames.nextRollValue(10).should.be.equal(0);
			frames.nextRollValue(2).should.be.equal(0);
			frames.nextRollValue(1).should.be.equal(0);
			frames.nextRollValue(0).should.be.equal(0);
		});  
	});
	describe('#nextTwoRollsValue()', function(){		
		it("should return the value of the first roll from the next round", function() {
			frames = Game.build([ 
				[5,5],
				[0,0],
				[10],
				[3,7],
				[10],
				[10] ]).frames;
			frames.nextTwoRollsValue(0).should.be.equal(0);
			frames.nextTwoRollsValue(1).should.be.equal(13);
			frames.nextTwoRollsValue(2).should.be.equal(10);
			frames.nextTwoRollsValue(3).should.be.equal(20);
		});

		it("should return 0 when there are no more rounds", function() {
			frames = Game.build([ 
				[5,5],
				[2,8],
				[10],
				[0,8],
				[10] ]).frames;
			frames.nextTwoRollsValue(3).should.be.equal(10);
			frames.nextTwoRollsValue(4).should.be.equal(0);
		});  

		it("should return 0 when frames is empty", function() {
			frames = Game.build([  ]).frames;
			frames.nextTwoRollsValue(10).should.be.equal(0);
			frames.nextTwoRollsValue(2).should.be.equal(0);
			frames.nextTwoRollsValue(1).should.be.equal(0);
			frames.nextTwoRollsValue(0).should.be.equal(0);
		});  
	});
});