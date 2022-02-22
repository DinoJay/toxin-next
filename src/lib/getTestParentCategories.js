
const MORIBOUND_OR_DEAD_ANIMALS_PRIOR_TO_STUDY_TERMINATION =
    'moribound_or_dead_animals_prior_to_study_termination';
// const MORTILATY_RATE = 'mortality_rate';
// const CONCLUSION = 'conclusion';
const GRADING_OF_LESION = 'grading_of_lesion';
const TYPE_OF_STUDY = 'type_of_study';
const TEST_SYSTEM_IN_VITRO = 'test_system_in_vitro';
const DOSE_LEVELS = 'dose_levels';
const DOSE_LEVEL_UNITY = 'dose_level_unity';
const ADMINISTRATION_SCHEME = 'administration_scheme';
const DOSE_VOLUME_ML_KG_BW = 'dose_level_volume_ML_KG_BW';
const RINSING_PROCEDURE = 'rinsing_procedure';
const USE_OF_ANAESTHETICS_AND_ANALGESICS = 'use_of_anaesthetics_and_anlgesics';
const VEHICLE_NAME = 'vehicle_name';
//TODO
const VEHICLE_CONCENTRATION = 'vehicle_concentration';
const EXPOSURE_TIME = 'exposure_time';
const OBSERVATION_PERIOD = 'observation_period';
const ADDITIONAL_INFORMATION = 'additional_information';
const OWN_COMMENTS = 'own_comments';

const test_endpoints_keys = [
    'target_organ',
    'observations',
    'moribund_or_dead_animals_prior_to_study_termination',
    'mortality_rate',
    'conclusion'
];

const test_conditions_keys = [
    'dose_levels',
    'dose_level_unit',
    'dose_volume',
    'rinsing_procedure',
    'vehicle_concentration',
    'exposure_time',
    'observation_period'
]

const test_substance_keys = [
    'homogeneity_and_stability',
    'treatment_prior_to_application',
    'physical_form',
    'concentration',
    'composition',
    'purity',
    'solubility_in_vehicle',
    'chemical_batch_nr',
    'particle_size',
    'additional_info'
];
const route_of_exposure_keys = [
    'oral',
    'dermal',
    'body_surface',
    'patching_technique',
    'skin_condition',
    'inhalation',
    'other'
];

const test_species_keys = [
    'species',
    'source',
    'age_at_start_of_experiment',
    'age_measuring_unit',
    'sex',
    'weight',
    'weight_measuring_unit',
    'feed',
    // 'n_animals_dose',
];

const reliability_of_test_keys = [
    'scss_comment_to_test',
    'year',
    'control_groups',
    'glp',
    'klimisch_score',
    'ref_in_dossier'
];

export default (obj) => {
    // console.log('obj', obj);
    // const keys = Object.keys(obj);
    let test_endpoints = {};
    let test_substance = {};
    let test_species = {};
    let reliability_of_test = {};
    let test_conditions = {}
    let route_of_exposure = {};

    test_endpoints_keys.forEach((k) => {
        test_endpoints[k] = obj[k];
    });
    test_substance_keys.forEach((k) => {
        test_substance[k] = obj[k];
    });
    test_species_keys.forEach((k) => {
        test_species[k] = obj[k];
    });
    reliability_of_test_keys.forEach((k) => {
        reliability_of_test[k] = obj[k];
    });
    test_conditions_keys.forEach((k) => {
        test_conditions[k] = obj[k];
    });
    route_of_exposure_keys.forEach((k) => {
        route_of_exposure[k] = obj[k];
    });

    const type_of_study = obj[TYPE_OF_STUDY];
    const type = obj.type;

    return {
        test_endpoints,
        test_substance,
        test_species,
        reliability_of_test,
        test_conditions,
        route_of_exposure,
        type_of_study,
        type
    };
};