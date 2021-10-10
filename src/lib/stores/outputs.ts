import type { Writable } from 'svelte/store';
import { derived, writable } from 'svelte/store';
import type { u8 } from 'typed-numbers';

const getBit = (num: number, pos: number) => (num & (1 << pos)) != 0;

export const soundBits1 = writable<u8>(0 as u8);
export const soundBits2 = writable<u8>(0 as u8);

export const sound0 = derived(soundBits1, $soundBits1 => getBit($soundBits1, 0), false);
export const sound1 = derived(soundBits1, $soundBits1 => getBit($soundBits1, 1), false);
export const sound2 = derived(soundBits1, $soundBits1 => getBit($soundBits1, 2), false);
export const sound3 = derived(soundBits1, $soundBits1 => getBit($soundBits1, 3), false);

export const sound4 = derived(soundBits2, $soundBits2 => getBit($soundBits2, 0), false);
export const sound5 = derived(soundBits2, $soundBits2 => getBit($soundBits2, 1), false);
export const sound6 = derived(soundBits2, $soundBits2 => getBit($soundBits2, 2), false);
export const sound7 = derived(soundBits2, $soundBits2 => getBit($soundBits2, 3), false);
export const sound8 = derived(soundBits2, $soundBits2 => getBit($soundBits2, 4), false);

