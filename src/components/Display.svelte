<script lang="ts">
	import { Memory } from 'eighty-eighty-js';
	import { onMount } from 'svelte';

	export let memory: Memory;
	export let height = 256;
	export let width = 224;

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;

	let imageData: ImageData = new ImageData(width, height);

	function refresh() {
		const frameBuffer = new Uint8Array(memory.data.slice(0x2400, 0x4000));

		for (let i = 0; i < frameBuffer.length; i++) {
			const byte = frameBuffer[i];
			const y = ~(((i & 0x1f) * 8) & 0xff) & 0xff;
			const x = i >> 5;

			for (let bitPos = 0; bitPos < 8; bitPos++) {
				const bit = (byte & (1 << bitPos)) != 0;
				const newY = y - bitPos;
				const offset = newY * (4 * width) + x * 4;

				if (bit) {
					imageData.data[offset] = 255;
					imageData.data[offset + 1] = 255;
					imageData.data[offset + 2] = 255;
					imageData.data[offset + 3] = 255;
				} else {
					imageData.data[offset] = 0;
					imageData.data[offset + 1] = 0;
					imageData.data[offset + 2] = 0;
					imageData.data[offset + 3] = 255;
				}
			}
		}

		context.putImageData(imageData, 0, 0);
		window.requestAnimationFrame(refresh);
	}

	onMount(() => {
		if (canvas) {
			context = canvas.getContext('2d');
			window.requestAnimationFrame(refresh);
		}
	});
</script>

<div class="display-container">
	<div class="display-padding">
		<div class="display-padding-inner"></div>
	</div>

	<div class="display-outer">
		<canvas class="display" bind:this={canvas} width={width} height={height}></canvas>
	</div>
</div>

<style>
	.display-container {
		padding-left:   1rem;
		padding-right:  1rem;
		padding-bottom: 1rem;
		position:       relative;
	}

	.display-padding {
		max-width: 36rem;
		position:  relative;
	}

	.display-padding-inner {
		width:       100%;
		padding-top: 100%;
	}

	.display-outer {
		padding-left:    1rem;
		padding-right:   1rem;
		padding-bottom:  1rem;
		inset:           0;
		position:        absolute;
		justify-content: center;
		display:         flex;
	}

	.display {
		width:         100%;
		height:        100%;
		max-width:     36rem;
		border-radius: 5px;
	}
</style>
