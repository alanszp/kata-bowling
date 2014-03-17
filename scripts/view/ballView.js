/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

var _ = require('lodash');
var Observable = require('../helpers/observable.js');
var DOMHelper = require('../helpers/DOMHelper.js');

function BallView(id) { /*, [subscribers, ...]*/
	this.dom = this.getById(id); 
	this.lastValue = "";

	this.dom.onblur(this.modified());

	if(arguments.length > 1) {
		this.subscribe(_.toArray(arguments).slice(1));
	}
}

Observable.apply(BallView, 'ballModification');


BallView.prototype.modified = function (onNothing) {
	var value = this.value();
	onNothing = onNothing || function(){};
	
	if (value != this.lastValue) {
		if (value > 10 || value < 0 || !/^\d*$/.test(value)) { 
			this.setValue('');
			throw new Error("UserException: Out of range value.");
		}

		this.lastValue = value;
		if ( value !== '') {
			this.notifyObservers();	
		}
	}
	else {
		onNothing();
	}
};

BallView.prototype.getById = DOMHelper.getById;

//DOM Wrapper
BallView.prototype.value = function() {
	return this.dom.value;
};

BallView.prototype.setValue = function(value) {
	this.dom.value = value+"";
};

BallView.prototype.enabled = function() { 
	return this.dom.enabled;
};

BallView.prototype.enable = function() { 
	this.dom.enabled = true;
};

BallView.prototype.disable = function() { 
	this.dom.enabled = false;
};

module.exports= BallView;

