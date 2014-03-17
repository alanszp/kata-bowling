/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

function BallDOMMock(){
	this.value="";
	this.enabled=true;
}

BallDOMMock.prototype.onblur= function(){
	
};

BallDOMMock.getById = function(id) {
	return new BallDOMMock();
};

BallDOMMock.mock = function(ball) {
	ball.prototype.getById = BallDOMMock.getById;
};

module.exports = BallDOMMock;