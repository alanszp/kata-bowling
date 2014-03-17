
/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";


var _ = require('lodash');

function GameController(id, DOMHelper) {
	this.DOMHelper = DOMHelper || new DOMHelper();
	this.framesViews = null; //Array of FrameViews objects.
	this.init(id);
}

GameController.prototype.init = function() {
	var dom = this.DOMHelper.getById(id);
	var domFrames = this.DOMHelper.getFramesIds(dom);
	this.framesViews = _.map(domFrames, function(df){
		return this.DOMHelper.getById(df);
	});
}; //Fill frames with dom

GameController.prototype.frameModificated = function(frame) {
	this.update(frame.round, frame.toArray);
};

GameController.prototype.ballFrames = function() {
	return _.map(this.framesViews, function(frame) {
		return frame.toArray();
	});
};

GameController.prototype.pointsModificated = function(pointsArray) {
	_.forEach(this.framesViews, function (frame) {
		frame.render(pointsArray);
	});
};