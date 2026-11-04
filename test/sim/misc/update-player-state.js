'use strict';

const assert = require('./../../assert');
const { BattleStream } = require('./../../../dist/sim/battle-stream');

function startBattle() {
	const stream = new BattleStream({ noCatch: true });
	const team = [
		{ species: 'Pikachu', moves: ['thunderbolt'] },
		{ species: 'Squirtle', moves: ['watergun'] },
		{ species: 'Bulbasaur', moves: ['vinewhip'] },
	];
	stream._writeLines([
		`>start ${JSON.stringify({ formatid: 'gen9customgame', seed: 'gen5,99176924e1c86af0' })}`,
		`>player p1 ${JSON.stringify({ name: 'Alice', team })}`,
		`>player p2 ${JSON.stringify({ name: 'Bob', team })}`,
	].join('\n'));
	return stream;
}

describe('BattleStream updatePlayerState', () => {
	it('should set the HP of p1 Pokemon by team position', () => {
		const stream = startBattle();
		stream._writeLines(`>updatePlayerState ${JSON.stringify([
			{ position: 0, hp: 10 },
			{ position: 2, hp: 25 },
		])}`);

		const [pikachu, squirtle, bulbasaur] = stream.battle.sides[0].pokemon;
		assert.equal(pikachu.hp, 10);
		assert.equal(squirtle.hp, squirtle.maxhp);
		assert.equal(bulbasaur.hp, 25);
	});

	it('should not change p2 Pokemon', () => {
		const stream = startBattle();
		stream._writeLines(`>updatePlayerState ${JSON.stringify([{ position: 0, hp: 10 }])}`);

		for (const pokemon of stream.battle.sides[1].pokemon) {
			assert.equal(pokemon.hp, pokemon.maxhp);
		}
	});
});
