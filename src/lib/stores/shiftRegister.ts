import type { Readable, Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import { u16, u8 } from 'typed-numbers';

function createShiftAmount(): Writable<u8> {
	const shiftAmount = writable<u8>(0 as u8);

	return {
		subscribe: shiftAmount.subscribe,
		update:    shiftAmount.update,

		set(value: u8) {
			shiftAmount.set(u8(value & 0x7));
		},
	};
}

export const shiftAmount = createShiftAmount();


function createShiftData(): Writable<u16> {
	const shiftData = writable<u16>(0 as u16);

	return {
		subscribe: shiftData.subscribe,
		update:    shiftData.update,

		set(value: u16) {
			shiftData.update($shiftData => u16(u16(value << 8) | u8($shiftData >> 8)));
		},
	};
}

export const shiftData = createShiftData();


export const shiftResult = derived(
	[ shiftAmount, shiftData ],
	([ $shiftAmount, $shiftData ]) => u8(
		$shiftData >> u16(8 - $shiftAmount),
	),
	0 as u8,
);
