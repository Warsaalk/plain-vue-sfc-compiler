<template>
    <label>
		  <input type="number" v-model="number" />
    </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Ref } from "vue";

const number: Ref<number | null> = ref(10);
</script>

<style scoped>
input[type="number"] { font-size: 0.8rem; }
</style>