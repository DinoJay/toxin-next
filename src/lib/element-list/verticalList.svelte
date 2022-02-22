<script>
	export let data = [];
	export let secLabel = 'guideline';
	export let className;
	import { fade, fly, slide } from 'svelte/transition';
	import ListElement from '$lib/element-list/listElement.svelte';

	let div;

	$: {
		if (div && data) {
			div.scrollTop = 0;
		}
	}
</script>

<div bind:this={div} class="{className} flex flex-col  overflow-y-auto">
	{#each data as d (d.key)}
		<div transition:fly class="my-1">
			<ListElement attr={secLabel} datum={d} />
		</div>
	{/each}
</div>
