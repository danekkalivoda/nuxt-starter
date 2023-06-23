<script lang="ts" setup>
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);
definePageMeta({ auth: false });
console.log(fullConfig);
</script>
<template>
  <div>
    <div class="text-red">homepage</div>
    <nuxt-link to="/protected/globally">To protected</nuxt-link>
  </div>
</template>
