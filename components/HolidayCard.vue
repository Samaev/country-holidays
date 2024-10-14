<script setup lang="ts">
const props = defineProps({
  holiday: {
    type: Object,
    required: true
  },
  country: {
    type: Object,
    required: false
  }
});
</script>

<template>
  <div class="card-header">
    Date: {{ holiday.date }}
  </div>
  <div class="card-body">
    <h5 class="card-title">Name: {{ holiday.name }}</h5>
    <p class="card-text">Local name: {{ holiday.localName }}</p>
  </div>
  <div v-if="country" class="card-footer d-flex justify-content-between align-items-center">
    <div>Country:</div>
    <button class="btn btn-primary">
      <NuxtLink :to="`/${holiday.countryCode}`"><span class="text-white">{{ country }}</span></NuxtLink>
    </button>
  </div>
</template>
