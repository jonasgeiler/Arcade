import { derived, writable } from 'svelte/store';
import { u8 } from 'typed-numbers';

export const coinSlot = writable(false);
export const tilt = writable(false);

export const fire = writable(false);
export const left = writable(false);
export const right = writable(false);

export const startP1 = writable(false);
export const fireP1 = writable(false);
export const leftP1 = writable(false);
export const rightP1 = writable(false);

export const startP2 = writable(false);
export const fireP2 = writable(false);
export const leftP2 = writable(false);
export const rightP2 = writable(false);

export const numberOfLives = writable<3 | 4 | 5 | 6>(3);
export const bonusLiveThreshold = writable<1000 | 1500>(1500);
export const coinInfo = writable(true);

export const inputBits0 = derived(
	[ fire, left, right ],
	([ $fire, $left, $right ]) => u8(
		0
		| (1 << 1)
		| (1 << 2)
		| (1 << 3)
		| (+$fire << 4)
		| (+$left << 5)
		| (+$right << 6)
	),
	0 as u8,
);

export const inputBits1 = derived(
	[ coinSlot, startP2, startP1, fireP1, leftP1, rightP1 ],
	([ $coinSlot, $startP2, $startP1, $fireP1, $leftP1, $rightP1 ]) => u8(
		+$coinSlot
		| (+$startP2 << 1)
		| (+$startP1 << 2)
		| (1 << 3)
		| (+$fireP1 << 4)
		| (+$leftP1 << 5)
		| (+$rightP1 << 6)
	),
	0 as u8,
);

export const inputBits2 = derived(
	[ numberOfLives, tilt, bonusLiveThreshold, fireP2, leftP2, rightP2, coinInfo ],
	([ $numberOfLives, $tilt, $bonusLiveThreshold, $fireP2, $leftP2, $rightP2, $coinInfo ]) => u8(
		($numberOfLives - 3)
		| (+$tilt << 2)
		| (+($bonusLiveThreshold == 1000) << 3)
		| (+$fireP2 << 4)
		| (+$leftP2 << 5)
		| (+$rightP2 << 6)
		| (+!$coinInfo << 7)
	),
	0 as u8,
);
