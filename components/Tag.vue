<template>
  <div class="mt-4 inline-block rounded-xl px-3 py-1" :class="cssClassType">
    <div class="flex gap-1 items-center text-white fill-white">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: string,
}>()

const cssClassType = computed(() => {
  if (props.type === 'primary') {
    return 'bg-blue-400'
  } else if (props.type === 'secondary') {
    return 'bg-red-500 active:bg-red-600 active:border-red-800 text-white'
  }

  return ''
})
</script>