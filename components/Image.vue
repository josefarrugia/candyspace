<script setup lang="ts">

const props = defineProps<{
  src?: string,
  alt?: string,
}>()

</script>

<template>
  <!-- @TODO: add srcset/sizes attribute to make image more responsive and performant -->
  <div>
    <img
        :src="props.src"
        :alt="props.alt"
        class="bg-gray-300"
        :class="$attrs.class"
    />
  </div>
</template>

<style lang="postcss" scoped>
div {
  aspect-ratio: 8/5;
  @apply bg-gray-50;
}
</style>

