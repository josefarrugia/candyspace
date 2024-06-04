<script setup lang="ts">
import {ArrowTrendingUpIcon, FireIcon} from '@heroicons/vue/24/solid';
import Tag from "~/components/Tag.vue";

interface Car {
  id: string,
  brand: string,
  model: string,
  colour: string,
  fuel: string,
  price: string,
  pricePerMonth: string,
  year: string,
  image: string,
  isTrending: boolean,
  isHot: boolean,
}

const props = defineProps<{
  car: Car,
}>()

const hasTags = computed(() => props.car.isTrending || props.car.isHot)

const formattedPrice = computed(() => `£${Number(props.car.price).toLocaleString()}`)

</script>

<template>
  <Block class="group cursor-pointer flex flex-col gap-4 relative font-noto-sans">
    <Image class="rounded-xl" :src="props.car.image"></Image>
    <div>
      <h3 class="text-base">{{ props.car.model }}</h3>
      <h2 class="uppercase text-xs font-bold">{{ props.car.brand }}</h2>
      <h4 class="text-xs">{{ props.car.year }}</h4>
    </div>
    <div v-if="hasTags" class="flex gap-1 absolute -top-6 -left-2">
      <Tag v-if="props.car.isTrending" type="primary">
        <ArrowTrendingUpIcon class="w-4 h-4"/>
        <span class="text-xs tracking-wider">TRENDING</span>
      </Tag>
      <Tag v-if="props.car.isHot" type="secondary">
        <div class="flex gap-1 items-center text-white fill-white">
          <FireIcon class="w-4 h-4"/>
          <span class="text-xs tracking-wider">HOT</span>
        </div>
      </Tag>
    </div>
    <div class="mt-auto">
      <h4 class="font-pt-mono text-lg">{{ formattedPrice }}</h4>
      <h4 class="font-pt-mono text-sm">£{{ props.car.pricePerMonth }}/month</h4>
    </div>
  </Block>
</template>
