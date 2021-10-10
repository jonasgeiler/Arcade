<script lang="ts">
	import { coinSlot, fireP1, fireP2, leftP1, leftP2, rightP1, rightP2, startP1, startP2, tilt } from '$lib/stores/inputs';
	import { bindInput } from '$lib/utils/bindings';

	const inputStartP1 = bindInput(startP1, '1');
	const inputFireP1 = bindInput(fireP1, 'w');
	const inputLeftP1 = bindInput(leftP1, 'a');
	const inputRightP1 = bindInput(rightP1, 'd');

	const inputStartP2 = bindInput(startP2, '2');
	const inputFireP2 = bindInput(fireP2, 'ArrowUp');
	const inputLeftP2 = bindInput(leftP2, 'ArrowLeft');
	const inputRightP2 = bindInput(rightP2, 'ArrowRight');

	const inputCoinSlot = bindInput(coinSlot, 'c');

	bindInput(tilt, 't');
</script>

<div class="container no-padding-top">
	<div class="container-inner">
		<div class="flex-row">
			<button title="Keyboard: C" class="nes-btn is-warning is-small" on:mousedown={inputCoinSlot.handleMouseDown} on:mouseup={inputCoinSlot.handleMouseUp}>
				Insert Coin
			</button>
			<button title="Keyboard: 1" class="nes-btn is-small" on:mousedown={inputStartP1.handleMouseDown} on:mouseup={inputStartP1.handleMouseUp}>
				Start 1 Player
			</button>
			<button title="Keyboard: 2" class="nes-btn is-small" on:mousedown={inputStartP2.handleMouseDown} on:mouseup={inputStartP2.handleMouseUp}>
				Start 2 Players
			</button>
		</div>

		<div class="flex-row row-margin">
			<div class="flex-column flex-grow flex-center">
				<button title="Keyboard: W" class="nes-btn is-error" on:mousedown={inputFireP1.handleMouseDown} on:mouseup={inputFireP1.handleMouseUp}>
					Fire
				</button>

				<div class="flex-row">
					<button title="Keyboard: A" class="nes-btn is-primary" on:mousedown={inputLeftP1.handleMouseDown} on:mouseup={inputLeftP1.handleMouseUp}>
						Left
					</button>
					<button title="Keyboard: D" class="nes-btn is-primary" on:mousedown={inputRightP1.handleMouseDown} on:mouseup={inputRightP1.handleMouseUp}>
						Right
					</button>
				</div>

				<h5>P1</h5>
			</div>

			<div class="flex-column flex-grow flex-center">
				<button title="Keyboard: Arrow up" class="nes-btn is-error" on:mousedown={inputFireP2.handleMouseDown} on:mouseup={inputFireP2.handleMouseUp}>
					Fire
				</button>

				<div class="flex-row">
					<button title="Keyboard: Arrow left" class="nes-btn is-primary" on:mousedown={inputLeftP2.handleMouseDown} on:mouseup={inputLeftP2.handleMouseUp}>
						Left
					</button>
					<button title="Keyboard: Arrow right" class="nes-btn is-primary" on:mousedown={inputRightP2.handleMouseDown} on:mouseup={inputRightP2.handleMouseUp}>
						Right
					</button>
				</div>

				<h5>P2</h5>
			</div>
		</div>
	</div>
</div>

<style>
	.no-padding-top {
		padding-top: 0;
	}

	.flex-row {
		display:        flex;
		flex-direction: row;
	}

	.flex-column {
		display:        flex;
		flex-direction: column;
	}

	.flex-grow {
		flex-grow: 1;
	}

	.flex-center {
		justify-content: center;
		align-items:     center;
	}

	.row-margin {
		margin-top: 1rem;
	}

	.nes-btn {
		margin: 8px;
	}

	.nes-btn.is-small {
		margin:    8px;
		padding:   3px 4px;
		font-size: 12px;
	}
</style>
