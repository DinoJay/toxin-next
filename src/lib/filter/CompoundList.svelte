<script>
	export let acuteToxicityCsv = [];
	export let irritationCorosivityCsv = [];
	export let repeatedToxicityCsv = [];
	export let typeOfStudy;
	export let guideline;
	export let results;
	export let oecd;
	export let nonOecd;
	import ElementList from '$lib/element-list/index.svelte';
	import transformObject from '$lib/transformObject';
	import uniqBy from 'lodash.uniqby';
	import getParentCategories from '$lib/getTestParentCategories';

	const { bindings } = results;
	const data = uniqBy(
		bindings
			.map(transformObject)
			.map((d) => ({ ...d, id: d.test, categories: getParentCategories(d) })),
		(d) => d.id
	);

	$: filteredData = data.filter((d) => {
		if (oecd && nonOecd) return true;
		if (oecd && !nonOecd) return !!d.oecd_test_nr;
		if (!oecd && nonOecd) return !d.oecd_test_nr;
		return false;
	});

	$: console.log('filteredData', filteredData, 'oecd', oecd, 'nonOecd', nonOecd);

	const testTypeDict = {
		invivo: ['Test_Repeated_Toxicity_in_vivo_Non_OECD'],
		invitro: [],
		insilico: [],
		inchemico: []
	};
</script>

<h2>Compounds by Health Effect</h2>
<div class=" mt-3 flex flex-col ">
	<ElementList data={filteredData} groupBy="compoundLabel" secLabel={'test'} />
</div>

<style>
</style>
