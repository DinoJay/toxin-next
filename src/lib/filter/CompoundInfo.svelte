<script>
	export let label;
	export let imgSrc;
	export let ec_number;
	export let cas_number;
	export let empirical_formula;
	export let function_and_uses;
</script>

<div class="">
	<div class="flex">
		<div class="mr-auto">
			<h1 class="font-bold">Chemical Name</h1>
			<div class="p-2">{label}</div>
		</div>
		<img
			style="height:200px"
			class="border object-contain"
			height="200"
			width="200"
			src={imgSrc}
			alt="chemical compound"
		/>
	</div>
	<h2>Substance identity</h2>
	<div class="p-2">
		<p>EC / List no.: {ec_number}</p>
		<p>CAS no.: {cas_number}</p>
		<p>Mol. formula: {empirical_formula}</p>
	</div>
	<div class="">
		<h2>Function:</h2>
		<p class="my-1 p-2 max-h-40 overflow-y-auto">{function_and_uses}</p>
	</div>
	<div>
		<h2>Chemical alert category</h2>
		<p class="my-1 p-2 max-h-40 overflow-y-auto">
			if link to OECDTOOL box for instance PHYSICO_CHEMICAL PROPERTY [Can be selected to display the
			complete physico-chemical property inputted or be linked to Cosmosdb to calculate new
			parameter]
		</p>
	</div>
</div>
