
/* jshint expr: true, node: true */
"use strict";

var _ = require('lodash');

var Observable = {
	subscribe: function(observers){
		if(arguments.length > 1) {
			return this.subscribe(_.toArray(arguments));
		}

		this.__subscribers = this.__subscribers || [];
		if(Array.isArray(observers)) {
			this.__subscribers = this.__subscribers.concat(observers);
		}
		else {
			this.__subscribers.push(observers);
		}
	},

	unsubscribe: function(observer){
		// TODO
	}	
};


Observable.apply = function (ClassOrObj, recieverMethodName, notifyMethodName) {
	var notify = notifyMethodName || 'notifyObservers';
	var reciever = recieverMethodName || 'notify';

	var notifyFn = function(){
		_.forEach(this.__subscribers, function (subscriber) {
			subscriber[reciever](this);
		}.bind(this));
	};

	if(ClassOrObj.hasOwnProperty('prototype')){
		ClassOrObj.prototype = _.extend({}, ClassOrObj.prototype, Observable);
		ClassOrObj.prototype[notify] = notifyFn;
	}
	else {
		_.extend(ClassOrObj, Observable);
		ClassOrObj[notify] = notifyFn;
	}
};

module.exports = Observable;