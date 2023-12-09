<template>
	<div id="home">
		<h1>Hello world</h1>
		<custom-input></custom-input>
	</div>
</template>

<script>
import Input from "./input.vue";

const test = true;

export default {
	name: "home",
	components: {
		"custom-input": Input
	}
}
</script>

<style scoped>
#home h1 { font-size: 1.5rem; }
</style>