function NormalRound(frames, round, fst, snd) {
	this.frames = frames;
	this.round = round;
	this.fst = fst;
	this.snd = snd;
	this.hasTwoBalls = true;
}

NormalRound.prototype.points =function() {
	return this.fst + this.snd;
};

NormalRound.prototype.toArray = function(){
		return [this.fst, this.snd];
	};


module.exports = NormalRound;