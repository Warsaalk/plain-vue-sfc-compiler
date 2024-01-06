<template>
    <label>
		  <input type="number" v-model="number" />
    </label>
</template>

<script setup>
import { ref } from 'vue';

const number = ref(10);
</script>

<style scoped>
input[type="number"] { font-size: 0.8rem; }
</style>