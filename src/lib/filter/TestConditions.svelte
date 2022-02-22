<script>
	import CloseIcon from 'svelte-remixicon/lib/icons/CloseLine.svelte';
	import Slider from '@bulatdashiev/svelte-slider';
	import Expandable from '$lib/Expandable.svelte';
	export let openId;
	export let onClick;
	let observationDays = [2, 40];
	let exposureTime = [0, 100];
	let vehicleConcentration = [0, 100];
	let testConditionsFilterEnabled = true;

	let observationPeriodEnabled = true;
	let vehicleConcentrationEnabled = true;
	let exposureTimeEnabled = true;
</script>

<Expandable open={openId === 'TestConditions'} {onClick}>
	<h2 class="text-xl" slot="title">Test Conditions</h2>
	<div>
		<div
			class="text-lg p-2 justify-center flex flex-col {!observationPeriodEnabled && 'opacity-50'}"
		>
			<label class="mr-2 flex items-center" for="observation"
				><span class="mr-auto">Observation period ({observationDays[0]} days):</span>
				<button on:click={() => (observationPeriodEnabled = !observationPeriodEnabled)}
					><CloseIcon color="#5684fd" /></button
				></label
			>
			<div class="w-40 {!observationPeriodEnabled && 'pointer-events-none'}">
				<Slider bind:value={observationDays} />
			</div>
		</div>
		<div class="text-lg p-2 flex justify-center flex-col {!exposureTimeEnabled && 'opacity-50'}">
			<label class="mr-2 flex items-center" for="exposure-time"
				><span class="mr-auto">Exposure time ({exposureTime[0]} hour(s)):</span><button
					on:click={() => (exposureTimeEnabled = !exposureTimeEnabled)}
					><CloseIcon color="#5684fd" /></button
				></label
			>
			<div class="w-40 {!exposureTimeEnabled && 'pointer-events-none'}">
				<Slider bind:value={exposureTime} />
			</div>
		</div>
	</div>
	<div>
		<div
			class="text-lg p-2 flex flex-col justify-center {!vehicleConcentrationEnabled &&
				'opacity-50'}"
		>
			<label class="mr-2 flex items-center" for="vehicle-concentration"
				><span class="mr-auto">Vehicle Concentration ({vehicleConcentration[0]}%):</span>
				<button on:click={() => (vehicleConcentrationEnabled = !vehicleConcentrationEnabled)}
					><CloseIcon color={'#5684fd'} /></button
				></label
			>
			<Slider bind:value={vehicleConcentration} />
		</div>
	</div>
</Expandable>

<style>
	fieldset {
		@apply mr-4;
		@apply mb-3;
		@apply border-2;
	}
	fieldset legend {
		@apply mx-3;
	}
</style>
