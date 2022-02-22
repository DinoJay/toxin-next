<script>
	import ElementList from '$lib/element-list/index.svelte';
	import Expandable from '$lib/Expandable.svelte';
	import { constructQuery } from '$lib/sparql';
	import transformObject from '$lib/transformObject';
	import getParentCategories from '$lib/getTestParentCategories';

	export let acuteToxicityCsv = [];
	export let irritationCorosivityCsv = [];
	export let repeatedToxicityCsv = [];
	export let compound;
	export let label;
	import uniqBy from 'lodash.uniqby';
	// import Table from '$lib/table.svelte';
	console.log('$$props', $$props);
	const sparqlQuery = ` 
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX ont: <http://ontologies.vub.be/oecd#>

		SELECT DISTINCT *
		{
			?test a ont:Test .
			?test ont:compound ?compound .
			?compound rdfs:label "${label}" .
			?test rdf:type ?type .
			OPTIONAL { ?test ont:GLP ?glp .  }
			OPTIONAL { ?test ont:Ref_in_dossier ?ref_in_dossier .  }
			OPTIONAL { ?test ont:SCCS_comment_to_test ?scss .  }
			OPTIONAL { ?test ont:additional_info ?additional_info .  }
			OPTIONAL { ?test ont:administration_scheme ?administration_scheme .  }
			OPTIONAL { ?test ont:chemical_batch_nr ?chemical_batch_nr .  }
			OPTIONAL { ?test ont:conclusion ?conclusion .  }
			OPTIONAL { ?test ont:critical_effect ?critical_effect .  }
			OPTIONAL { ?test ont:dermal ?dermal .  }
			OPTIONAL { ?test ont:description_of_pod ?description_of_pod .  }
			OPTIONAL { ?test ont:dose_levels ?dose_levels .  }
			OPTIONAL { ?test ont:dose_levels_unity ?dose_levels_unity .  }
			OPTIONAL { ?test ont:exposure_period ?exposure_period .  }
			OPTIONAL { ?test ont:feed ?feed .  }
			OPTIONAL { ?test ont:moribound_or_dead_animals_prior_to_study_termination ?moribound_or_dead_animals_prior_to_study_termination .  }
			OPTIONAL { ?test ont:mortality_rate ?mortality_rate .  }
			OPTIONAL { ?test ont:observation_period ?observation_period .  }
			OPTIONAL { ?test ont:observations ?observations .  }
			OPTIONAL { ?test ont:oecd_test_nr ?oecd_test_nr .  }
			OPTIONAL { ?test ont:pod ?pod .  }
			OPTIONAL { ?test ont:preliminary_test ?preliminary_test .  }
			OPTIONAL { ?test ont:purity ?purity .  }
			OPTIONAL { ?test ont:sex ?sex .  }
			OPTIONAL { ?test ont:species ?species .  }
			OPTIONAL { ?test ont:species_strain ?species_strain .  }
		}	
	`;

	let promise = fetch(constructQuery('repeated-toxicity', sparqlQuery))
		.then((res) => res.json())
		.then((e) => {
			const { bindings } = e.results;
			const tests = bindings.map(transformObject).map((d) => ({
				...d,
				type: 'repeated-toxicity',
				categories: getParentCategories(d)
			}));
			console.log('tests', tests);
			return uniqBy(tests, (d) => d.test); // console.log('res', res);
		});

	// const data = [
	// 	'Irritation and corrosivity',
	// 	'Skin sensitisation',
	// 	'Organ-specific toxicity',
	// 	'Repeated dose toxicity',
	// 	'Reproductive toxicitya',
	// 	'Mutagenicity / genotoxicity',
	// 	'Carcinogenicity',
	// 	'Photo-induced toxicity',
	// 	'New Hampshire',
	// 	'Human data',
	// 	'Special investigations',
	// 	'Absorption',
	// 	'Toxicokinetics',
	// 	'Distribution',
	// 	'Metabolism',
	// 	'Extraction'
	// ];VkkkV
	$: {
		// console.log('props $$$', $$props);
		// console.log('compound compound', compound);
		// const data = [...acuteToxicityCsv, ...irritationCorosivityCsv, ...repeatedToxicityCsv];
		// console.log('data', data);
		// tests = data.filter((d) => d.compound === compound.compound);
		// console.log('tests', tests);
	}
</script>

<div>
	<h2 class="text-xl mb-3">Toxicological Data</h2>
	{#await promise}
		<div>Loading</div>
	{:then tests}
		<ElementList data={tests} groupBy="type" secLabel="test" />
	{/await}
</div>
