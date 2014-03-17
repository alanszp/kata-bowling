
/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

var assert = require("should");
var BallView = require("../scripts/view/ballView.js");
var BallDOMMock = require("./mocks/ballDOMMock.js");
var FrameView = require("../scripts/view/frameView.js");
var FrameDOMMock = require("./mocks/frameDOMMock.js");
var _ = require('lodash');
BallDOMMock.mock(BallView);
FrameDOMMock.mock(FrameView);

describe('kata-bowling-game', function(){
	describe('BallView', function(){
		it("should create a new ball with a dom mock", function(){
			var ball = new BallView("anyId");
			ball.dom.should.be.an.instanceOf(BallDOMMock);
		});	

		describe('#modified()', function(){
			
			it("should do nothing if the value did not change", function() {
				var passed = false;

				var ball = new BallView("anyID");

				ball.modified(function(){
					passed = true;
				});

				passed.should.be.true;
			});

			it("should call the observers with the method #ballModification() and the argument should be itself", function() {
				var reciver = {
					passed:null,
					ballModification:function(obj){ 
						this.passed = obj;
					}
				};

				var ball = new BallView("anyID", reciver);

				ball.setValue('2');

				ball.modified();

				reciver.passed.should.be.equal(ball);
			});

			it("should throw exception when value is not numeric", function(){
				var ball = new BallView("anyID");

				ball.setValue('asfd');
				(function try1(){
					ball.modified();
				}).should.throw(/UserException: /);

				ball.setValue('asfd4');
				(function try2(){
					ball.modified();
				}).should.throw(/UserException: /);

				ball.setValue('4asd');
				(function try3(){
					ball.modified();
				}).should.throw(/UserException: /);


				ball.setValue(' ');
				(function try4(){
					ball.modified();
				}).should.throw(/UserException: /);
			});

			it("should throw exception when value is out of range", function(){
				var ball = new BallView("anyID");

				ball.setValue('-1');

				(function try1(){
					ball.modified();
				}).should.throw(/UserException: /);


				ball.setValue('-1012');
				(function try2(){
					ball.modified();
				}).should.throw(/UserException: /);

				ball.setValue('11');
				(function try3(){
					ball.modified();
				}).should.throw(/UserException: /);

				ball.setValue('1235');
				(function try1(){
					ball.modified();
				}).should.throw(/UserException: /);
			});
		});

	});

	describe('FrameView', function(){
		it("should create a new frame view with dom mock objects", function(){
			var frame = new FrameView("frame-0");
			frame.round.should.be.equal(0);
			frame.fst.should.be.an.instanceOf(BallView);
			frame.snd.should.be.an.instanceOf(BallView);
			frame.fst.dom.should.be.an.instanceOf(BallDOMMock);
			frame.snd.dom.should.be.an.instanceOf(BallDOMMock);
			frame.points.should.be.an.instanceOf(FrameDOMMock.PointsDOMMock);
		});	

		describe('#ballModification()', function(){
			it("should enable the second ball when the first one is less than 10", function(){
				var frame = new FrameView("frame-0");

				frame.snd.disable();
				
				frame.fst.setValue(4);
				frame.ballModification(frame.fst);

				frame.snd.enabled().should.be.true;
			});

			it("should disable the second ball when the first one is 10", function(){
				var frame = new FrameView("frame-0");
				
				frame.fst.setValue(10);
				frame.ballModification(frame.fst);

				frame.snd.enabled().should.be.false;
			});

			it("should call the observer with the method #frameModificated() and the argument should be itself when the first shoot is 10", function () {
				var reciver = {
					passed:null,
					times:0,
					frameModificated:function(obj){ 
						this.times += 1;
						this.passed = obj;
					}
				};

				var frame = new FrameView("frame-0", reciver);
				
				frame.fst.setValue(10);
				frame.ballModification(frame.fst);

				reciver.passed.should.be.equal(frame);
				reciver.times.should.be.equal(1);
			});

			it("should call the observer with the method #frameModificated() and the argument should be itself when the first shoot is less than 10 and the sencond one was done", function () {
				var reciver = {
					passed:null,
					times:0,
					frameModificated:function(obj){ 
						this.times += 1;
						this.passed = obj;
					}
				};

				var frame = new FrameView("frame-0", reciver);
				
				frame.fst.setValue(5);
				frame.ballModification(frame.fst);

				frame.snd.setValue(2);
				frame.ballModification(frame.snd);


				reciver.passed.should.be.equal(frame);
				reciver.times.should.be.equal(1);
			});

			it("should NOT call the observer with the method #frameModificated() the first shoot is less than 10", function () {
				var reciver = {
					passed:null,
					times:0,
					frameModificated:function(obj){ 
						this.times += 1;
						this.passed = obj;
					}
				};

				var frame = new FrameView("frame-0", reciver);
				
				frame.fst.setValue(3);
				frame.ballModification(frame.fst);

				(reciver.passed === null).should.be.true;
				reciver.times.should.be.equal(0);
			});
		});
	});
});