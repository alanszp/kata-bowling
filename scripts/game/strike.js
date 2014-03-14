var _ = require("lodash");
var NormalRound = require("./normalRound.js");


function Strike(frames, round) {
	NormalRound.call(this, frames, round, 10, 0);
	this.hasTwoBalls = false;
}

Strike.prototype = _.extend({}, NormalRound.prototype, {
	points: function (){
		return this.fst + this.snd + this.frames.nextTwoRollsValue(this.round);
	}

});
Strike.prototype.constructor = Strike;


module.exports = Strike;