/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";


var _ = require('lodash');
var Observable = require('../helpers/observable.js');
var DOMHelper = require('../helpers/DOMHelper.js');
var BallView = require('./ballView.js');

function FrameView (id) { /*, [subscribers, ...]*/
	//this.dom = this.getById(id);

	this.round = Number(id.slice(6)); // ids are 'frame-X' where x is the round

	this.fst = new BallView(this.domFstBall(), this);
	this.snd = new BallView(this.domSndBall(), this);
	this.points = this.domPoints();

	if(arguments.length > 1) {
		this.subscribe(_.toArray(arguments).slice(1));
	}
}

Observable.apply(FrameView, 'frameModificated');


FrameView.prototype.ballModification = function(ball) {
	if(ball === this.fst && ball.value() == 10) {
		this.snd.disable();
		this.notifyObservers();
	}
	else if(ball === this.snd) {
		this.notifyObservers();
	}
	else {
		this.snd.enable();
	}
};

FrameView.prototype.toArray = function() {
	return [this.fst.value(), this.snd.value()];
};

FrameView.prototype.render = function(framesPoints) {
	if(framesPoints[this.round+1] === undefined || this.round === 0) {
		this.disable();
	}
	else {
		this.setPoints(framesPoints[this.round]);
		this.enable();		
	}
};

FrameView.prototype.getById = DOMHelper.getById;

//DOM Wrapper

FrameView.prototype.enable = function() {
	this.fst.enable();
	this.snd.enable();
};

FrameView.prototype.disable = function() {
	this.fst.disable();
	this.snd.disable();
};

FrameView.prototype.enabled = function() {
	return this.fst.enabled();
};

FrameView.prototype.domFstBall = function() {
	return this.getById("shoot-"+ (this.round*2));
};
FrameView.prototype.domSndBall = function() {
	return this.getById("shoot-"+ (this.round*2 + 1));
};
FrameView.prototype.domPoints = function() {
	return this.getById("points-"+ this.round);
};

FrameView.prototype.setPoints = function(points) {
	if(isNaN(points)) {
		this.points.value = "";
	}
	else {
		this.points.value = points;
	}
};


module.exports = FrameView;