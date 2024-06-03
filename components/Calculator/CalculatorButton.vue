<template>
  <button type="button"
          class="p-4 rounded-2xl active:shadow-inner font-bold border-4 border-transparent active:scale-90 transition-all text-2xl"
          :class="cssClassType">
    <slot>
      Label
    </slot>
  </button>
</template>

<script setup lang="ts">

const props = defineProps<{
  type?: string,
}>()

const cssClassType = computed(() => {
  if (props.type === 'secondary') {
    return 'bg-amber-300 active:bg-amber-400 active:border-amber-500'
  } else if (props.type === 'tertiary') {
    return 'bg-red-500 active:bg-red-600 active:border-red-800 text-white'
  }

  return 'bg-blue-200 active:bg-blue-200 active:border-blue-400'
})
</script>