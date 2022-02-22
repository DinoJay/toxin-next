<script>
	import AttrElement from './attrElement.svelte';
	import StringElement from './stringElement.svelte';
	import { fade, slide } from 'svelte/transition';
	// import { v4 as uuidv4 } from 'uuid';

	export let categories;
	export let key;
	export let open;
	export let i;
	// console.log('categories', categories);

	const cats = Object.entries(categories).map(([key, values]) => ({ key, values }));
	console.log('key', key);
	console.log('cats', cats);
	// console.log('cats', cats);
	// console.log('key', key);
	// let open = false;
</script>

{#if open}
	<div class="ml-12">
		{#each cats as c}
			{#if typeof c.values === 'object'}
				<AttrElement key={c.key} categories={c.values} />
			{:else}
				<StringElement key={c.key} value={c.values} />
			{/if}
		{/each}
	</div>
{/if}
