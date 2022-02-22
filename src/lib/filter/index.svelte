<script>
	import HealthEffectFilter from './HealthEffect.svelte';
	import ChemicalCompoundFilter from './ChemicalCompound.svelte';
	import CompoundInfo from './CompoundInfoWrapper.svelte';
	import ToxicologicalData from './ToxicologicalData.svelte';
	import CompoundList from './CompoundList.svelte';
	import SafetyAssessment from './SafetyAssessment.svelte';
	import TestSpecies from './TestSpecies.svelte';
	import TestConditions from './TestConditions.svelte';
	import ArrowRightSFill from 'svelte-remixicon/lib/icons/ArrowRightSFill.svelte';
	import CompoundInfoWrapper from './CompoundInfoWrapper.svelte';

	let promise = null;
	$: console.log('props ', $$props);
	let openId = null;
	const clickWrapper = (key) => () => openId === key ? (openId = null) : (openId = key);
</script>

<div class="">
	<div class="mt-2 grid">
		<div class="p-2 border-2 mr-1 mb-1 cont flex-grow transition-all" style="">
			<ChemicalCompoundFilter
				{...$$props}
				bind:promise
				{openId}
				onClick={clickWrapper('ChemicalCompound')}
			/>
			<!-- <EndpointTypeFilter /> -->
			<!-- <TestSubstanceFilter /> -->
		</div>
		<div class="p-2 border-2 cont  mb-1 flex-grow">
			<HealthEffectFilter
				{...$$props}
				bind:promise
				{openId}
				onClick={clickWrapper('HealthEffect')}
			/>
		</div>
		<div class="p-2 border-2 cont mr-1 mb-1 flex-grow">
			<TestSpecies {...$$props} bind:promise {openId} onClick={clickWrapper('TestSpecies')} />
		</div>
		<div class="p-2 border-2 cont mb-1 flex-grow">
			<TestConditions {...$$props} bind:promise {openId} onClick={clickWrapper('TestConditions')} />
		</div>
	</div>

	<div class="border mt-3 p-3">
		{#if promise}
			{#await promise}
				<p>...waiting</p>
			{:then res}
				{#if res.type === 'compound'}
					<div class="">
						<CompoundInfoWrapper {...res} />
					</div>
				{/if}
				{#if res.type === 'health-effect'}
					<div class="">
						<div class="mt-3">
							<CompoundList {...$$props} {...res} />
						</div>

						<div class="mt-6">
							<SafetyAssessment />
						</div>
					</div>
				{/if}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		{:else}
			<div class="flex default-cont ">
				<div class="m-auto text-xl font-bold">Please select and apply a filter</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		/* grid-template-rows: 1fr 1fr; */
		gap: 5px 5px;
		grid-template-areas:
			'. .'
			'. .'
			'. .';
	}
	.default-cont {
		height: 500px;
	}
	.cont {
		/* min-width: 49%;
		max-width: 50%; */
		height: fit-content;
	}
	fieldset {
		@apply mr-4;
		@apply mb-3;
		@apply border-2;
	}
	fieldset legend {
		@apply mx-3;
	}
</style>
