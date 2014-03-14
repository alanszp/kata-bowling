
/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

var assert = require("should");
var Game = require("../scripts/game/game.js");
var LastRound = require("../scripts/game/lastRound.js");
var NormalRound = require("../scripts/game/normalRound.js");
var Spare = require("../scripts/game/spare.js");
var Strike = require("../scripts/game/strike.js");
var $ = require("../scripts/helpers/assertions.js");


describe('kata-bowling-game', function(){
	describe('#roll()', function(){
		var game = new Game();

		beforeEach(function(){
			game.clear();
		});

		it('should return "Strike" when knocks down all the pins on his first try', function(){
			game.roll([10]).should.equal("Strike");
			game.roll([10,0]).should.equal("Strike");
		});
		
		it('should return "Spare" when knoks down all the pins in two tries', function () {
			game.roll([2,8]).should.equal("Spare");
			game.roll([5,5]).should.equal("Spare");
			game.roll([7,3]).should.equal("Spare");
			game.roll([0,10]).should.equal("Spare");
		});

		it('should return the "NormalRound" when the player did not do a spare nor a strike', function() {
			game.roll([2,1]).should.equal("NormalRound");
			game.roll([4]).should.equal("NormalRound");
			game.roll([0,0]).should.equal("NormalRound");
			game.roll([2,7]).should.equal("NormalRound");
			game.roll([7,1]).should.equal("NormalRound");
		});

		it('should raise an error when rolls more than 3 balls and is not the last shoot', function() {
			(function (){
				new Game().roll([0,0,0]);
			}).should.throw(/Wrong number of arguments/);
		});

		it('should raise an error when rolls more than 10 pins', function() {
			(function (){
				new Game().roll([15]);
			}).should.throw(/Wrong numbers of pins knoked down/);
		});

		it('should raise an error when rolls more than 10 pins', function() {
			(function (){
				game.roll([11,1]);
			}).should.throw(/Wrong numbers of pins knoked down/);
		});

		it('should raise an error when rolls more than 10 pins', function() {
			(function (){
				game.roll([1,11]);
			}).should.throw(/Wrong numbers of pins knoked down/);
		});

		it('should raise an error when rolls more than 10 pins', function() {
			(function (){
				game.roll([11,12]);
			}).should.throw(/Wrong numbers of pins knoked down/);
		});
		it('should raise an error when rolls more than 10 pins', function() {
			(function (){
				game.roll([4,9]);
			}).should.throw(/Wrong numbers of pins knoked down/);
		});

		it('should create an new empty game', function(){
			game.frames.length().should.equal(0);
		});

		it('should return last shoot if it is and came 3 arguments', function(){});
		it('should return an error if its last shoot and has no good arguments', function(){});
		it('should raise an error when the game has finished', function(){});

	});
	describe("Game.build()", function(){
		it("should create an empty game",function(){
			var game = Game.build([]);
			game.frames.length().should.equal(0);
		});
		it("should create a game with a Strike",function(){
			var game = Game.build([ [10] ]);
			$.assertAllRoundsClasses(game.frames, [Strike]);
		});
		it("should create a game with a NormalRound",function(){
			var game = Game.build([ [2,5] ]);
			$.assertAllRoundsClasses(game.frames, [NormalRound]);
		});

		it("should create a game with a Spare",function(){
			var game = Game.build([ [5,5] ]);
			$.assertAllRoundsClasses(game.frames, [Spare]);
		});

		it("should create a game with a Spare, a Spare, a Strike and a NormalRound",function(){
			var game = Game.build([ 
				[5,5],
				[2,8],
				[10],
				[0,8] ]);
			$.assertAllRoundsClasses(game.frames, [Spare,Spare,Strike,NormalRound]);
		});

		it("should create a game with a Spare, Spare, Strike, NormalRound, Spare, Spare, Strike, NormalRound, NormalRound, LastRound",function(){
			var game = Game.build([ 
				[5,5],
				[2,8],
				[10],
				[0,8],
				[1,9],
				[0,10],
				[10],
				[0,0],
				[2,4],
				[2,5,0] ]);
			$.assertAllRoundsClasses(game.frames, [Spare,Spare,Strike,NormalRound,Spare,Spare,Strike,NormalRound,NormalRound,LastRound]);
		});
		it("should create a perfect game", function() {
			var game = Game.build([ 
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10,10,10] ]);
			$.assertAllRoundsClasses(game.frames, [Strike,Strike,Strike,Strike,Strike,Strike,Strike,Strike,Strike,LastRound]);
		});
	});
	
	describe("#points()", function(){
		it("should equal 300 a perfect game", function(){
			var game = Game.build([ 
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10],
				[10,10,10] ]);
			game.points().should.equal(300);
		});
	});
});
