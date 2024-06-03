<template>
  <div
      class="mx-auto max-w-80 bg-gray-100 p-6 rounded-2xl flex flex-col gap-4 shadow-2xl border-4 border-gray-200 font-pt-mono">

    <div class="flex justify-between items-baseline">
      <h1 class="text-xl text-gray-300 uppercase">Farrugia</h1>
      <h2 class="text-xs text-gray-300 uppercase">Calc–CandySpace</h2>
    </div>

    <input type="text"
           class="bg-gray-500 rounded-2xl w-full px-4 py-6 text-white appearance-none outline-none text-xl"
           v-model="userInput">

    <div class="grid grid-rows-4 grid-cols-4 gap-1">
      <CalculatorButton type="tertiary" @click="clearUserInput" class="col-span-2">AC</CalculatorButton>
      <CalculatorButton @click="clearUserInput" class="col-span-2">ON</CalculatorButton>
      <CalculatorButton type="secondary" @click="handleButton">/</CalculatorButton>
      <CalculatorButton v-for="i in [9, 8, 7]" @click="handleButton">{{ i }}</CalculatorButton>
      <CalculatorButton type="secondary" @click="handleButton">*</CalculatorButton>
      <CalculatorButton v-for="i in [6, 5, 4]" @click="handleButton">{{ i }}</CalculatorButton>
      <CalculatorButton type="secondary" @click="handleButton">+</CalculatorButton>
      <CalculatorButton v-for="i in [3, 2, 1]" @click="handleButton">{{ i }}</CalculatorButton>
      <CalculatorButton type="secondary" @click="handleButton">-</CalculatorButton>
      <CalculatorButton v-for="i in [0]" class="col-span-2" @click="handleButton">{{ i }}</CalculatorButton>
      <CalculatorButton type="secondary" @click="calculateUserInput">=</CalculatorButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalculatorButton from "~/components/Calculator/CalculatorButton.vue";

const userInput = ref('');

function handleButton(event: Event) {
  const button = event.target as HTMLButtonElement;

  userInput.value += button.innerText;
}

function clearUserInput() {
  userInput.value = ''
}

function calculateUserInput() {
  userInput.value = eval(userInput.value);
}
</script>