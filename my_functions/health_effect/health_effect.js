
// import fetch2 from 'node-fetch';
import fetch from 'node-fetch'

const btoa = (text) => {
	return Buffer.from(text, 'binary').toString('base64');
};

const endpointMaker = (n) => `https://wise.vub.ac.be/fuseki/${n}/sparql`;
const constructQuery = (e, q) => `${endpointMaker(e)}?query=${encodeURIComponent(q)}&format=json`;


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


function fetchAuth() {
	// (A) URL & CREDENTIALS
	const url = 'https://wise.vub.ac.be/fuseki/';
	const credentials = btoa('fuseki:ohYeeduoKae~joochotheechei6ONe');
	console.log('credentials', credentials);

	// (B) FETCH WITH HTTP AUTH
	fetch(url, {
		headers: {
			Authorization: `Basic ${credentials}`
		}
	})
		// (C) SERVER RESPONSE
		.then((result) => {
			console.log('server resp', result)
			// if (result.status != 200) {
			// 	throw new Error('Bad Server Response');
			// }
			return result.text();
		})
		.then((response) => {
			console.log('success', response);
		})

		// (D) HANDLE ERRORS (OPTIONAL)
		.catch((error) => {
			console.log(error);
		});
}


exports.handler = async (event, context) => {
	// let response
	// const API_ENDPOINT = constructQuery('repeated-toxicity', sparqlQuery)
	// try {
	// 	response = await fetch(API_ENDPOINT)
	// 	// handle response
	// } catch (err) {
	// 	console.log('error', err)
	// 	return {
	// 		statusCode: err.statusCode || 500,
	// 		body: JSON.stringify({
	// 			error: err.message
	// 		})
	// 	}
	// }

	// console.log('response', response)
	// return {
	// 	statusCode: 200,
	// 	body: JSON.stringify({
	// 		data: response
	// 	})
	// }
	fetchAuth();
}