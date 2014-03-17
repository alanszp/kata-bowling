var NullRound = require("./nullRound.js");
var _ = require("lodash");

module.exports = function Frames() {
	this.rounds = [];

	this.clear = function (){
		this.rounds = [];
	};

	this.addRound = function(round){
		if(this.length() < 10) {
			this.rounds.push(round);
		} 
		else {
			throw new Error("Game has finished.");
		}
	};
	
	this.points = function(){
		//console.log(_.map(this.rounds, function(round) {return round.constructor.name + ' ' + round.points();}) );
		return _.reduce(this.rounds, function(sum, round) {
			return sum + round.points();
		},0);
	};

	this.length = function(){
		return this.rounds.length;
	};

	this.isLastRound = function(){
		return (this.length() == 9);
	};

	this.get = function(pos){
		return this.rounds[pos] || new NullRound();
	};

	this.nextRound = function(actualPos){
		return this.get(actualPos+1);
	};

	this.nextRollValue = function(actualPos){
		return this.nextRound(actualPos).fst;
	};

	this.nextTwoRollsValue = function(actualPos){
		return this.nextRollValue(actualPos) + (this.nextRound(actualPos).hasTwoBalls ? this.nextRound(actualPos).snd : this.nextRollValue(actualPos+1) );
	};

	this.roundPoints = function () {
		return _.map(this.rounds, function(elem) {
			return elem.points();
		});
	};

};

