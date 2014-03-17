
/* jshint expr: true, node: true */
/* global describe, it, beforeEach, before */
"use strict";

var assert = require("should");
var Observable = require("../scripts/helpers/observable.js");
var _ = require('lodash');

describe('observable-mixin', function(){
	describe('#apply()', function(){
		it('should create an object with the propertys inherited by observable mixin', function() {
			var obj = {num: 4};
			Observable.apply(obj);

			obj.should.have.property('num', 4);
			obj.should.have.property('subscribe');
			obj.should.have.property('unsubscribe');
			obj.should.have.property('notifyObservers');
		});
		
		it('should create an object with the propertys inherited by observable mixin and the notify method should be the 3rd argment', function() {
			var obj = {num: 4};
			Observable.apply(obj, undefined, 'notifyAllTheObservers');

			obj.should.have.property('num', 4);
			obj.should.have.property('subscribe');
			obj.should.have.property('unsubscribe');
			obj.should.have.property('notifyAllTheObservers');
		});		

		it('should notify all observers', function() {
			function Class(){}

			var reciver = { 
				passed: false,
				notify: function(){
					this.passed = true;
				}
			};

			Observable.apply(Class);
			var obj = new Class();

			obj.subscribe(reciver);
			obj.notifyObservers();

			reciver.should.have.property('passed', true);
		});


		it('should notify all observers and give themself as the argument', function() {
			function Class(){}

			var reciver = { 
				passed: false,
				modified: function(arg){
					this.passed = arg;
				}
			};

			Observable.apply(Class, 'modified');
			var obj = new Class();

			obj.subscribe(reciver);
			obj.notifyObservers();

			reciver.should.have.property('passed', obj);
		});

		it('should notify all observers with the method "#modified()"', function() {
			function Class(){}

			var reciver = { 
				passed: false,
				modified: function(){
					this.passed = true;
				}
			};

			Observable.apply(Class, 'modified');
			var obj = new Class();

			obj.subscribe(reciver);
			obj.notifyObservers();

			reciver.should.have.property('passed', true);
		});



		it('should notify all observers with the method "#modified()" and the method used by the observable should be "#tell()"', function() {
			function Class(){}

			var reciver = { 
				passed: false,
				modified: function(){
					this.passed = true;
				}
			};

			Observable.apply(Class, 'modified', 'tell');
			var obj = new Class();

			obj.subscribe(reciver);
			obj.tell();

			reciver.should.have.property('passed', true);
		});

		it('should add subsribers as array', function() {
			function Class(){}

			var reciver1 = {1:1}, reciver2 = {2:2}, reciver3 = {3:3};

			Observable.apply(Class, 'modified', 'tell');
			var obj = new Class();

			obj.subscribe([reciver1, reciver2, reciver3]);
			obj.__subscribers.should.be.eql([reciver1, reciver2, reciver3]);
		});

		it('should add subsribers as a list of arguments', function() {
			function Class(){}

			var reciver1 = {1:1}, reciver2 = {2:2}, reciver3 = {3:3};

			Observable.apply(Class, 'modified', 'tell');
			var obj = new Class();

			obj.subscribe(reciver1, reciver2, reciver3);
			obj.__subscribers.should.be.eql([reciver1, reciver2, reciver3]);
		});


	});

});