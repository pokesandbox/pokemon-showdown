/**
 * Battle Stream Example
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Example of how to create AIs battling against each other.
 * Run this using `node build && node dist/sim/examples/battle-stream-example-2`.
 *
 * @license MIT
 * @author Guangcong Luo <guangcongluo@gmail.com>
 */

import {BattleStream, getPlayerStreams, Teams} from '..';
// import {RandomPlayerAI} from '../tools/random-player-ai';

/*********************************************************************
 * Run AI
 *********************************************************************/

const streams = getPlayerStreams(new BattleStream());

const spec = {
	formatid: "gen9customgame",
};
const p1spec = {
	name: "Bot 1",
	team: Teams.pack(Teams.generate('gen9randombattle')),
};
const p2spec = {
	name: "Bot 2",
	team: Teams.pack(Teams.generate('gen9randombattle')),
};

// const p1 = new RandomPlayerAI(streams.p1);
// const p2 = new RandomPlayerAI(streams.p2);

// console.log("p1 is " + p1spec.name);
// console.log("p2 is " + p2spec.name);

void (async () => {
	for await (const chunk of streams.omniscient) {
		console.log(chunk);
	}
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}
>p1 team 123456
>p2 team 123456
>p1 move 1
>p2 move 1`);
