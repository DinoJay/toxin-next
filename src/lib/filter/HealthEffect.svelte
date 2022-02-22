<script>
	import Expandable from '$lib/Expandable.svelte';
	import { constructQuery, endpointMaker } from '$lib/sparql.js';
	import CompoundList from './CompoundList.svelte';
	import SafetyAssessment from './SafetyAssessment.svelte';
	export let openId;
	export let promise;
	export let onClick;

	const data = [
		{ label: 'Acute Toxicity', endpoint: 'acute-toxicity' },
		{ label: 'Irritation and corrosivity' },
		{ label: 'Skin sensitisation' },
		{ label: 'Organ-specific toxicity' },
		{ label: 'Repeated dose toxicity', endpoint: 'repeated-toxicity' },
		{ label: 'Reproductive toxicitya' },
		{ label: 'Mutagenicity / genotoxicity' },
		{ label: 'Carcinogenicity' },
		{ label: 'Photo-induced toxicity' },
		{ label: 'New Hampshire' },
		{ label: 'Human data' },
		{ label: 'Special investigations' },
		{ label: 'Absorption' },
		{ label: 'Toxicokinetics' },
		{ label: 'Distribution' },
		{ label: 'Metabolism' },
		{ label: 'Extraction' }
	];

	let val = '';
	let open = true;
	$: valInList = !!data.find((d) => d.label.toLowerCase() === val.toLowerCase());

	$: endpoint = data.find((d) => d.label.toLowerCase() === val.toLowerCase())?.endpoint;

	const sparqlQuery = ` 
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX ont: <http://ontologies.vub.be/oecd#>

		SELECT DISTINCT *
		{
			?test a ont:Test .
			?test ont:compound ?compound .
			?compound rdfs:label ?compoundLabel .
			?test rdf:type ?type .

		# 	const test_endpoints_keys = [
		#     'target_organ',
		#     'observations',
		#     'dose_descriptor',
		#     'moribund_or_dead_animals_prior_to_study_termination',
		#     'mortality_rate',
		#     'conclusion'
		# ];

			OPTIONAL { ?test ont:target_organ ?target_organ .  }
			OPTIONAL { ?test ont:observations ?observations .  }
			OPTIONAL { ?test ont:dose_descriptor ?dose_descriptor .  }
			OPTIONAL { ?test ont:moribound_or_dead_animals_prior_to_study_termination ?moribound_or_dead_animals_prior_to_study_termination .  }
			OPTIONAL { ?test ont:mortality_rate ?mortality_rate .  }
			OPTIONAL { ?test ont:conclusion ?conclusion .  }

		# const test_conditions_keys = [
		#     'dose_levels',
		#     'dose_level_unit',
		#     'dose_volume',
		#     'rinsing_procedure',
		#     'vehicle_concentration',
		#     'exposure_time',
		#     'observation_period'
		# ]

			OPTIONAL { ?test ont:dose_levels ?dose_levels .  }
			OPTIONAL { ?test ont:dose_level_unit ?dose_level_unit .  }
			OPTIONAL { ?test ont:dose_volume ?dose_volume .  }
			OPTIONAL { ?test ont:rinsing_procedure ?rinsing_procedure .  }
			OPTIONAL { ?test ont:vehicle_concentration ?vehicle_concentration .  }
			OPTIONAL { ?test ont:exposure_time ?exposure_time .  }
			OPTIONAL { ?test ont:observation_period ?observation_period .  }

		# const test_substance_keys = [
		#     'homogeneity_and_stability',
		#     'treatment_prior_to_application',
		#     'physical_form',
		#     'concentration',
		#     'composition',
		#     'purity',
		#     'solubility_in_vehicle',
		#     'chemical_batch_nr',
		#     'particle_size',
		#     'additional_info'
		# ];

			OPTIONAL { ?test ont:homogeneity_and_stability ?homogeneity_and_stability .  }
			OPTIONAL { ?test ont:treatment_prior_to_application ?treatment_prior_to_application .  }
			OPTIONAL { ?test ont:physical_form ?physical_form .  }
			OPTIONAL { ?test ont:concentration ?concentration .  }
			OPTIONAL { ?test ont:composition ?composition .  }
			OPTIONAL { ?test ont:purity ?purity .  }
			OPTIONAL { ?test ont:solubility_in_vehicle ?solubility_in_vehicle .  }
			OPTIONAL { ?test ont:chemical_batch_nr ?chemical_batch_nr .  }
			OPTIONAL { ?test ont:particle_size ?particle_size .  }
			OPTIONAL { ?test ont:additional_info ?additional_info .  }

		# const route_of_exposure_keys = [
		#     'oral',
		#     'dermal',
		#     'body_surface',
		#     'patching_technique',
		#     'skin_condition',
		#     'inhalation',
		#     'other'
		# ];

			OPTIONAL { ?test ont:oral ?oral .  }
			OPTIONAL { ?test ont:dermal ?dermal .  }
			OPTIONAL { ?test ont:body_surface ?body_surface .  }
			OPTIONAL { ?test ont:patching_technique ?patching_technique .  }
			OPTIONAL { ?test ont:skin_condition ?skin_condition .  }
			OPTIONAL { ?test ont:inhalation ?inhalation .  }
			OPTIONAL { ?test ont:other ?other .  }

		# const test_species_keys = [
		#     'species',
		#     'source',
		#     'age_at_start_of_experiment',
		#     'age_measuring_unit',
		#     'sex',
		#     'weight',
		#     'weight_measuring_unit',
		#     'feed',
		#     'n_animals_dose',
		# ];

			OPTIONAL { ?test ont:species ?species.  }
			OPTIONAL { ?test ont:source ?source .  }
			OPTIONAL { ?test ont:age_at_start_of_experiment ?age_at_start_of_experiment .  }
			OPTIONAL { ?test ont:age_measuring_unit ?age_measuring_unit .  }
			OPTIONAL { ?test ont:sex ?sex .  }
			OPTIONAL { ?test ont:weight ?weight .  }
			OPTIONAL { ?test ont:weight_measuring_unit ?weight_measuring_unit .  }
			OPTIONAL { ?test ont:feed ?feed .  }
			OPTIONAL { ?test ont:n_animals_dose ?n_animals_dose .  }

		# const reliability_of_test_keys = [
		#     'scss_comment_to_test',
		#     'year',
		#     'control_groups',
		#     'glp',
		#     'klimisch_score',
		#     'Ref_in_dossier'
		# ];

			OPTIONAL { ?test ont:scss_comment_to_test ?scss_comment_to_test .  }
			OPTIONAL { ?test ont:year ?year .  }
			OPTIONAL { ?test ont:control_groups ?control_groups .  }
			OPTIONAL { ?test ont:glp ?glp .  }
			OPTIONAL { ?test ont:klimisch_score ?klimisch_score .  }
			OPTIONAL { ?test ont:ref_in_dossier ?ref_in_dossier .  }
		}	
	`;

	let oecd = true;
	let nonOecd = true;

	let invivo = true;
	let invitro = true;
	let insilico = true;
	let inchemico = true;
</script>

<Expandable open={openId === 'HealthEffect'} {onClick}>
	<h2 class="text-xl" slot="title">Health Effect</h2>
	<div class="text-lg">
		<p class="mb-3">Look for compounds with a specific toxicological outcome</p>
		<form on:submit={(e) => e.preventDefault()}>
			<div class="mb-3">
				<div class="">
					<label for="toxi-outcome">Type the health effect or parameter of interest:</label>
					<input
						class="ml-1 p-1 border"
						list="outcomes"
						name="toxi-outcome"
						id="toxi-outcome"
						bind:value={val}
					/>
					<datalist id="outcomes">
						{#each data as d}
							<option value={d.label}>{d.label}</option>
						{/each}
					</datalist>
				</div>
			</div>
			<div class="mb-3">
				<p>Chose the type(s) of study:</p>
				<div>
					<input type="checkbox" id="in-vivo" name="in-vivo" bind:checked={invivo} />
					<label for="in-vivo">In vivo</label>
				</div>
				<div>
					<input type="checkbox" id="in-vitro" name="in-vitro" bind:checked={invitro} />
					<label for="in-vitro">In vitro</label>
				</div>
				<div>
					<input type="checkbox" id="in-silico" name="in-silico" bind:checked={insilico} />
					<label for="in-silico">In silico</label>
				</div>
				<div>
					<input type="checkbox" id="in-chemico" name="in-chemico" bind:checked={inchemico} />
					<label for="in-chemico">In chemico</label>
				</div>
			</div>

			<div>
				<p>Chose the type of guideline(s):</p>
				<div>
					<input type="checkbox" id="oecd" name="oecd" bind:checked={oecd} />
					<label for="oecd">OECD</label>
				</div>
				<div>
					<input type="checkbox" id="non-oecd" name="non-oecd" bind:checked={nonOecd} />
					<label for="non-oecd">Non-OECD</label>
				</div>
			</div>

			<button
				class="mt-3 border px-2 py-1 w-full {!valInList && 'opacity-50'}"
				disabled={!valInList}
				on:click={() => {
					promise = fetch(constructQuery(endpoint, sparqlQuery))
						.then((res) => res.json())
						.then((res) => ({
							...res,
							compoundLabel: decodeURI(res.compoundLabel),
							oecd,
							nonOecd,
							invivo,
							invitro,
							insilico,
							inchemico,
							type: 'health-effect'
						}));
				}}>Go</button
			>
		</form>
	</div>
</Expandable>

<style>
	:global([role='listbox']) {
		margin: 20rem;
	}
</style>
