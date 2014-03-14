var Frames = require("./frames.js");
var LastRound = require("./lastRound.js");
var NormalRound = require("./normalRound.js");
var Spare = require("./spare.js");
var Strike = require("./strike.js");
var _ = require("lodash");

function Game() {
	this.frames = new Frames();

	this.clear = function() {
		this.frames = new Frames();
	};

	this.points = function(){
		return this.frames.points();
	};

	this.roll = function (array){
		var Class = null;

		fst = array[0];
		snd = array[1] || 0;
		trd = array[2] || 0;		

		if(array.length > 3 || array.length === 0) {
			throw new Error("Wrong number of arguments");
		}


		if (this.frames.isLastRound()) {
			/* LAST ROUND */
			/* TODO: Falta chequear que esten bien los 3 tiros */
			
			Class = LastRound;
		}	
		else if (array.length == 3) {
				throw new Error("Wrong number of arguments. It's not the last round.");
		} else {
			
			if(fst + snd > 10) throw new Error("Wrong numbers of pins knoked down: " + (fst + snd) );

			if(fst == 10) {
				/* STRIKE */
				Class = Strike;
			}
			else if (fst + snd == 10) {
				/* SPARE */
				Class = Spare;
			}
			else {
				/* NORMAL */
				Class = NormalRound;
			}
		}


		this.frames.addRound(new Class(this.frames, this.frames.length(), fst, snd, trd));
		return Class.name;
	};
	
}


Game.build = function (array) {
	var game = new this();
	_.forEach(array, function(round){
		game.roll(round);
	});
	return game;
};

module.exports = Game;