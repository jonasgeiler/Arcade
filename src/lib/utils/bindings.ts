import type { Readable, Writable } from 'svelte/store';

interface MouseHandler {
	handleMouseDown(event: MouseEvent): void;

	handleMouseUp(event: MouseEvent): void;
}

export function bindInput(store: Writable<boolean>, key: string): MouseHandler {
	let usingMouse = false;
	let usingKeyboard = false;

	document.addEventListener('keydown', event => {
		if (usingMouse) return;
		if (event.key != key) return;

		usingKeyboard = true;
		store.set(true);
	});

	document.addEventListener('keyup', event => {
		if (usingMouse) return;
		if (event.key != key) return;

		usingKeyboard = false;
		store.set(false);
	});

	return {
		handleMouseDown: event => {
			if (usingKeyboard) return;
			if (event.button != 0) return;

			usingMouse = true;
			store.set(true);
		},

		handleMouseUp: event => {
			if (usingKeyboard) return;
			if (event.button != 0) return;

			usingMouse = false;
			store.set(false);
		},
	};
}

export function bindSound(store: Readable<boolean>, src: string) {
	let sound = new Audio(src);
	sound.volume = 0.1;

	let prevState = false;

	store.subscribe(state => {
		if (state == prevState) return;
		if (state == true && prevState == false) sound.play();

		prevState = state;
	});
}
