<template>
	<div id="home">
		<h1>Hello world</h1>
		<custom-input-1></custom-input-1>
		<custom-input-2></custom-input-2>
	</div>
</template>

<script>
import Input1 from "./input1.vue";
import Input2 from "./input2.vue";

const test = true;

export default {
	name: "home",
	components: {
		"custom-input-1": Input1,
		"custom-input-2": Input2
	}
}
</script>

<style>
#home {
		h1 { font-size: 1.5rem; }
}
</style>