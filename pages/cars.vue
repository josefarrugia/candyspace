<script setup lang="ts">
import {gsap} from "gsap";
import {
  AdjustmentsHorizontalIcon,
  CurrencyPoundIcon,
  CalendarIcon,
  MagnifyingGlassCircleIcon,
  PlusCircleIcon
} from "@heroicons/vue/16/solid";
import {useCarStore} from "~/stores/cars";

const storeCar = useCarStore();
const filterIsOpen = ref(false);

// Filter Options
const filterPrice = ref(10000);
const filterYear = ref(2000);
const filterBrand = ref('');

const filteredResults = computed(() => {
  return storeCar.getCars
      .filter(item => item.price > filterPrice.value && item.year > filterYear.value && item.brand.toLowerCase().includes(filterBrand.value.toLowerCase()));
})
const formattedFilterPrice = computed(() => `£${Number(filterPrice.value).toLocaleString()}`)

const beforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
    y: 10,
  })
}

const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    onComplete: done,
    delay: el.dataset.index * 0.1,
    ease: 'power2.out'
  })
}

const toggleExpand = () => {
  filterIsOpen.value = !filterIsOpen.value;
}

if (process.client) {
  fetch("/api/cars")
      .then((res) => res.json())
      .then((json) => {
        storeCar.updateCars(json.cars)
      })
}
</script>

<template>
  <section v-if="storeCar.getCars" class="bg-gray-50 min-h-screen py-8 font-noto-sans">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="lg:basis-2/12 relative">
          <div
              class="flex flex-col gap-1 bg-white rounded-xl p-8 shadow-2xl shadow-blue-100 fixed z-10 bottom-4 lg:bottom-0 lg:sticky lg:top-4 overflow-hidden lg:overflow-auto filter-options"
              :class="[ filterIsOpen ? 'lg:h-auto' : 'h-[128px] lg:h-auto']"
          >
            <div class="flex gap-1 items-center mb-4 lg:mb-8">
              <AdjustmentsHorizontalIcon class="w-4 h-4 fill-blue-600"/>
              <h2 class="text-blue-600 uppercase text-sm tracking-wider font-bold">Filter Options</h2>
            </div>
            <button type="button" @click="toggleExpand"
                    class="mb-8 gap-1 lg:hidden bg-gray-100 text-blue-600 p-2 rounded-xl">
              <span class="flex justify-center items-center gap-1" v-if="filterIsOpen">
                <PlusCircleIcon class="w-4 h-4 fill-blue-600"/>
              Close
              </span>
              <span class="flex justify-center items-center gap-1" v-else>
                <PlusCircleIcon class="w-4 h-4 fill-blue-600"/>
              Expand
              </span>
            </button>
            <div class="flex flex-col gap-1">
              <div class="flex gap-1 items-center mb-2">
                <CurrencyPoundIcon class="w-4 h-4 fill-blue-600"/>
                <label for="price_range" class="uppercase text-xs text-blue-600">Price</label>
              </div>
              <input id="price_range" type="range" min="10000" max="30000" step="500" v-model="filterPrice"/>
              <small class="text-xs text-blue-600">{{ formattedFilterPrice }}</small>
              <hr class="my-4"/>
            </div>
            <div class="flex flex-col gap-1">
              <div class="flex gap-1 items-center mb-2">
                <CalendarIcon class="w-4 h-4 fill-blue-600"/>
                <label for="year_range" class="uppercase text-xs text-blue-600">Year Range</label>
              </div>
              <input id="year_range" type="range" min="2000" max="2024" step="1" v-model="filterYear"/>
              <small class="text-xs text-blue-600">{{ filterYear }}</small>
              <hr class="my-4"/>
            </div>
            <div class="flex flex-col gap-1">
              <div class="flex gap-1 items-center mb-2">
                <MagnifyingGlassCircleIcon class="w-4 h-4 fill-blue-600"/>
                <label for="brand" class="uppercase text-xs text-blue-600">Brand</label>
              </div>
              <input type="text" name="brand" id="brand" v-model="filterBrand"
                     placeholder="Example: Honda"
                     class="text-sm rounded-md appearance-none outline-none p-2 border-2 border-blue-50 focus:border-blue-200 active:border-blue-400 transition-all">
              <hr class="my-4"/>
            </div>
          </div>
        </div>
        <transition-group appear tag="div" class="lg:basis-10/12 grid grid-cols-1 lg:grid-cols-4 gap-6"
                          @before-enter="beforeEnter"
                          @enter="enter">
          <BlockCar v-for="(car, index) in filteredResults" :key="car.id" :car :data-index="index"/>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.filter-options {
  width: calc(100% - 2rem);
  @screen lg {
    @apply w-full;
  }
}

</style>
