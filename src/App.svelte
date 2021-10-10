<script lang="ts">
	import { game } from '$lib/stores/game';
	import { inputBits0, inputBits1, inputBits2 } from '$lib/stores/inputs';
	import { soundBits1, soundBits2 } from '$lib/stores/outputs';
	import { shiftAmount, shiftData, shiftResult } from '$lib/stores/shiftRegister';
	import { Cpu, Memory } from 'eighty-eighty-js';
	import 'nes.css/css/nes.min.css';
	import { onMount } from 'svelte';
	import { u16, u8 } from 'typed-numbers';
	import Controls from './components/Controls.svelte';
	import Display from './components/Display.svelte';
	import Header from './components/Header.svelte';
	import Speaker from './components/Speaker.svelte';

	const memory = new Memory();
	const cpu = new Cpu(memory, { input, output });

	let interruptAddress = u16(0x08);

	let _inputBits0 = 0 as u8;
	inputBits0.subscribe(value => _inputBits0 = value);

	let _inputBits1 = 0 as u8;
	inputBits1.subscribe(value => _inputBits1 = value);

	let _inputBits2 = 0 as u8;
	inputBits2.subscribe(value => _inputBits2 = value);

	let _shiftResult = 0 as u8;
	shiftResult.subscribe(value => _shiftResult = value);

	function input(port: u8): u8 {
		switch (port) {
			case 0:
				return _inputBits0;

			case 1:
				return _inputBits1;

			case 2:
				return _inputBits2;

			case 3:
				return _shiftResult;

			default:
				throw new Error('Unknown port: ' + port);
		}
	}

	function output(port: u8, byte: u8) {
		switch (port) {
			case 2:
				shiftAmount.set(byte);
				return;

			case 3:
				soundBits1.set(byte);
				return;

			case 4:
				shiftData.set(byte as u16);
				return;

			case 5:
				soundBits2.set(byte);
				return;

			case 6:
				return;

			case 7:
				return;

			default:
				throw new Error('Unknown port: ' + port);
		}
	}

	async function loadROM(url: string, offset: number) {
		const rom = await fetch(url)
			.then(response => response.arrayBuffer())
			.then(buffer => new Uint8Array(buffer));

		memory.load(rom, offset);
	}

	function update() {
		if (cpu.halted) return;

		let cycle = 0;
		while (cycle < 16667) {
			cycle += cpu.next();
		}

		cpu.handleInterrupt(interruptAddress);
		interruptAddress = u16(interruptAddress == 0x08 ? 0x10 : 0x08);

		while (cycle < 33334) {
			cycle += cpu.next();
		}

		window.requestAnimationFrame(update);
	}

	onMount(async () => {
		switch ($game) {
			case 'space-invaders':
				await Promise.all([
					loadROM('/games/space-invaders/roms/invaders.h', 0x0000),
					loadROM('/games/space-invaders/roms/invaders.g', 0x0800),
					loadROM('/games/space-invaders/roms/invaders.f', 0x1000),
					loadROM('/games/space-invaders/roms/invaders.e', 0x1800),
				]);
				break;

			case 'lunar-rescue':
				await Promise.all([
					loadROM('/games/lunar-rescue/roms/lrescue.1', 0x0000),
					loadROM('/games/lunar-rescue/roms/lrescue.2', 0x0800),
					loadROM('/games/lunar-rescue/roms/lrescue.3', 0x1000),
					loadROM('/games/lunar-rescue/roms/lrescue.4', 0x1800),
					loadROM('/games/lunar-rescue/roms/lrescue.5', 0x4000),
					loadROM('/games/lunar-rescue/roms/lrescue.6', 0x4800),
				]);
				break;
		}

		window.requestAnimationFrame(update);
	});
</script>


<header>
	<Header />
</header>

<section>
	<Display {memory} />
</section>

<footer>
	<Controls />
</footer>

<Speaker />

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

	body {
		background-image: url(/img/arcade-background.png);
	}

	#app {
		display:        flex;
		flex-direction: column;
		height:         100vh;
	}

	#app > header {
		flex-grow: 1;
	}

	#app > footer {
		flex-grow:       1;
		display:         flex;
		justify-content: center;
		align-items:     flex-end;
	}

	.container {
		padding:         1rem;
		display:         flex;
		justify-content: center;
	}

	.container-inner {
		width:     100%;
		max-width: 36rem;
	}
</style>
