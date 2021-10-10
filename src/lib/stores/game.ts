import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

function createGame(): Writable<string> {
	const initialGame = localStorage.getItem('game') ?? 'space-invaders';
	const game = writable(initialGame);

	return {
		subscribe: game.subscribe,
		update:    game.update,

		set(value: string) {
			game.set(value);
			localStorage.setItem('game', value);
			location.reload();
		},
	};
}

export const game = createGame();

