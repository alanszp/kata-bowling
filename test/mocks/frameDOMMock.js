/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

var BallView = require("../../scripts/view/ballView.js");

function PointsDOMMock(){
	this.value="";
}

function FrameDOMMock(){}

FrameDOMMock.getById = function(id) {
	if(/^shoot/.test(id)){
		return new BallView();	
	}
	else if(/^points/.test(id)){
		return new PointsDOMMock();	
	}
	else {
		throw new Error("Unexpected ID.");	
	}

};


FrameDOMMock.PointsDOMMock = PointsDOMMock;

FrameDOMMock.mock = function(frame) {
	frame.prototype.getById = FrameDOMMock.getById;
};

module.exports = FrameDOMMock;