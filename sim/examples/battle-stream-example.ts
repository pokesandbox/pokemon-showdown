/**
 * Battle Stream Example
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Example of how to create AIs battling against each other.
 * Run this using `node build && node .sim-dist/examples/battle-stream-example`.
 *
 * @license MIT
 * @author Guangcong Luo <guangcongluo@gmail.com>
 */

import {BattleStream, getPlayerStreams, Teams} from '..';
import {RandomPlayerAI} from '../tools/random-player-ai';

/*********************************************************************
 * Run AI
 *********************************************************************/

const battleStream = new BattleStream();

const streams = getPlayerStreams(battleStream);

const spec = {
	formatid: "gen8customgame",
};
const p1spec = {
	name: "Bot 1",
	team: Teams.pack(Teams.generate('gen8randombattle')),
};
const p2spec = {
	name: "Bot 2",
	team: Teams.pack(Teams.generate('gen8randombattle')),
};

// const p1 = new RandomPlayerAI(streams.p1);
const p2 = new RandomPlayerAI(streams.p2);

// console.log("p1 is " + p1.constructor.name);
console.log("p2 is " + p2.constructor.name);

// void p1.start();
void p2.start();

let i = 2;
let k = 2;

void (async () => {
	for await (const chunk of streams.omniscient) {
		console.log(chunk);

		const results = chunk.split('\n');

		for (const line of results) {
			const item = line.split('|');
			if (item[1] === 'turn') {
				if (parseInt(item[2]) > 1) {
					void streams.omniscient.write(`>p1 move ${k}`);
					k++;
					if (k === 5) k = 1;
				}
				console.log('\np1 active requests \n');
				console.log(battleStream.battle!.p1.activeRequest);
				console.log('\np2 active requests \n');
				console.log(battleStream.battle!.p2.activeRequest);
			}
			if (item[1] === 'faint' && i < 7) {
				if (item[2].split(':')[0] === 'p1a') {
					void streams.omniscient.write(`>p1 switch ${i}`);
					i++;
				}
				if (item[2].split(':')[0] === 'p2a') {
					// do nothing
				}

				console.log('\ninput Log \n');
				console.log(battleStream.battle!.inputLog);
				console.log('\nmessage Log \n');
				console.log(battleStream.battle!.messageLog);
				console.log('\np1 active requests \n');
				console.log(battleStream.battle!.p1.activeRequest);
				console.log('\np2 active requests \n');
				console.log(battleStream.battle!.p2.activeRequest);
			}
		}
	}
})();

void streams.omniscient.write(`>start ${JSON.stringify(spec)}
>player p1 ${JSON.stringify(p1spec)}
>player p2 ${JSON.stringify(p2spec)}
>p1 team 123456
>p2 team 123456
>p1 move 1`);
