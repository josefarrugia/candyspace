<script setup lang="ts">
import {makeServer} from "~/server";

if (process.env.NODE_ENV === "development") {
  makeServer()
}


</script>

<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=PT+Mono&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
</style>