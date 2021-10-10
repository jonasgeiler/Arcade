<script lang="ts">
	import { game } from '$lib/stores/game';
	import { sound0, sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8 } from '$lib/stores/outputs';
	import { bindSound } from '$lib/utils/bindings';

	switch ($game) {
		case 'space-invaders':
			bindSound(sound0, '/games/space-invaders/sounds/0.wav');
			bindSound(sound1, '/games/space-invaders/sounds/1.wav');
			bindSound(sound2, '/games/space-invaders/sounds/2.wav');
			bindSound(sound3, '/games/space-invaders/sounds/3.wav');
			bindSound(sound4, '/games/space-invaders/sounds/4.wav');
			bindSound(sound5, '/games/space-invaders/sounds/5.wav');
			bindSound(sound6, '/games/space-invaders/sounds/6.wav');
			bindSound(sound7, '/games/space-invaders/sounds/7.wav');
			bindSound(sound8, '/games/space-invaders/sounds/8.wav');
			break;

		case 'lunar-rescue':
			bindSound(sound0, '/games/lunar-rescue/sounds/thrust.wav');
			bindSound(sound1, '/games/lunar-rescue/sounds/beamgun.wav');
			bindSound(sound2, '/games/lunar-rescue/sounds/rescueshipexplosion.wav');
			bindSound(sound3, '/games/lunar-rescue/sounds/alienexplosion.wav');
			bindSound(sound4, '/games/lunar-rescue/sounds/steph.wav');
			bindSound(sound5, '/games/lunar-rescue/sounds/stepl.wav');
			bindSound(sound6, '/games/lunar-rescue/sounds/shootingstar.wav');
			bindSound(sound7, '/games/lunar-rescue/sounds/bonus3.wav');
			bindSound(sound8, '/games/lunar-rescue/sounds/bonus2.wav');
			break;
	}
</script>
