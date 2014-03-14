var _ = require("lodash");
var NormalRound = require("./normalRound.js");


function LastRound(frames, round, fst, snd, trd) {
	NormalRound.call(this, frames, round, fst, snd);
	this.trd = trd;
}

LastRound.prototype = _.extend({}, NormalRound.prototype, {
	points: function (){
		return this.fst + this.snd + this.trd;
	},
	toArray: function(){
		return [this.fst,this.snd,this.trd];
	}

});

LastRound.prototype.constructor = LastRound;


module.exports = LastRound;
