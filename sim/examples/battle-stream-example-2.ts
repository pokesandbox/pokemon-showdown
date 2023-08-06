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
import { CustomData } from '../dex';
// import {RandomPlayerAI} from '../tools/random-player-ai';

type Spec = {
	formatid: string,
	customData?: CustomData,
}

/*********************************************************************
 * Run AI
 *********************************************************************/

const streams = getPlayerStreams(new BattleStream());

const spec: Spec = {
	formatid: "gen9customgame",
	customData: {
		Dex: {
			Abilities: {},
			Aliases: {},
			Conditions: {},
			FormatsData: {},
			Items: {},
			Learnsets: {
				"1010726453974925402acafia": {
					learnset: {
						aerialace: ["9M"],
						amaze: ["9T"],
						amnesia: ["9L37"],
						attract: ["9M"],
						berryjuicer: ["9M"],
						berryshare: ["9M"],
						bulletseed: ["9T"],
						captivate: ["9T"],
						clearsky: ["9M"],
						closecombat: ["9E"],
						confide: ["9M"],
						confound: ["9T"],
						crosscutleaf: ["9M"],
						curse: ["9L33"],
						cut: ["9M"],
						dazzle: ["9T"],
						demolish: ["9T"],
						doubleteam: ["9M"],
						echoedvoice: ["9M"],
						endeavor: ["9T"],
						endure: ["9L46", "9T"],
						energyball: ["9M"],
						enthrall: ["9T"],
						facade: ["9M"],
						falseswipe: ["9M"],
						flash: ["9M"],
						focusenergy: ["9E"],
						frustration: ["9M"],
						furycutter: ["9T"],
						gigadrain: ["9T"],
						grassknot: ["9M"],
						grasspledge: ["9T"],
						grassyterrain: ["9E"],
						growl: ["9L1"],
						growth: ["9L10"],
						headbutt: ["9T"],
						hiddengift: ["9M"],
						hiddenpower: ["9M"],
						hornattack: ["9L19"],
						hornleech: ["9E"],
						ironhead: ["9T"],
						irontail: ["9T"],
						leafage: ["9L6"],
						megahorn: ["9E"],
						naturalgift: ["9T"],
						naturepower: ["9M"],
						payback: ["9M"],
						pinmissile: ["9E"],
						playrough: ["9L42"],
						poisonjab: ["9M"],
						poisonsting: ["9E"],
						powergarden: ["9T"],
						protect: ["9M"],
						rage: ["9E"],
						razorleaf: ["9L15"],
						reflect: ["9M"],
						rest: ["9M"],
						return: ["9M"],
						rocksmash: ["9M"],
						rocktomb: ["9M"],
						round: ["9M"],
						safeguard: ["9M"],
						secretpower: ["9T"],
						seedbomb: ["9L28", "9T"],
						sleeptalk: ["9M"],
						smartstrike: ["9T"],
						snore: ["9T"],
						solarbeam: ["9M"],
						stingerlance: ["9M"],
						stomp: ["9E"],
						strength: ["9M"],
						substitute: ["9M"],
						sunnyday: ["9M"],
						swagger: ["9M"],
						swordsdance: ["9M"],
						synthesis: ["9T"],
						tackle: ["9L1"],
						toxic: ["9M"],
						woodhammer: ["9L51"],
						workup: ["9T"],
						worryseed: ["9T"],
						yawn: ["9L24"],
						zenheadbutt: ["9T"],
					}
				}
			},
			Moves: {},
			Natures: {},
			Pokedex: {
				"1010726453974925402acafia": {
					num: 50000_0001,
					name: "Acafia",
					types: ["Grass"],
					genderRatio: {M: 0.875, F: 0.125},
					baseStats: {hp: 62, atk: 68, def: 56, spa: 41, spd: 48, spe: 43},
					abilities: {0: "Overgrow", H: "Chlorophyll"},
					heightm: 0.8,
					weightkg: 12.8,
					color: "Green",
					evos: ["Catalcia"],
					eggGroups: ["Field"],
				},
			},
			PokemonGoData: {},
			Rulesets: {},
			Scripts: {},
			TypeChart: {},
		},
		Text: {
			Abilities: {},
			Default: {},
			Items: {},
			Moves: {},
			Pokedex: {
				"1010726453974925402acafia": {
					name: "Acafia",
				},
			}
		}
	}
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
