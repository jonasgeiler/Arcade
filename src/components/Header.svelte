<script>
	import { game } from '$lib/stores/game';
</script>

<div class="container">
	<div class="container-inner">
		<div class="header-row">
			<div class="nes-select">
				<select bind:value={$game}>
					<option value="space-invaders">Space Invaders</option>
					<option value="lunar-rescue">Lunar Rescue</option>
				</select>
			</div>

			<a class="github-link" href="https://github.com/Skayo/EightyEighty.js" target="_blank">
				<i class="nes-icon github is-medium"></i>
			</a>
		</div>
	</div>
</div>

<style>
	.header-row {
		display:         flex;
		flex-direction:  row;
		justify-content: center;
		align-items:     center;
	}

	.github-link {
		margin-left: 1rem;
	}
</style>
