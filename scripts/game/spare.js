var _ = require("lodash");
var normalRound = require("./normalRound.js");


function Spare(frames, round, fst, snd) {
	normalRound.call(this, frames, round, fst, snd);
}


Spare.prototype = _.extend({}, normalRound.prototype, {
	points: function() {
		return this.fst + this.snd + this.frames.nextRollValue(this.round);
	}
});


Spare.prototype.constructor = Spare;


module.exports = Spare;
