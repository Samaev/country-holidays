<script setup lang="ts">
import { ref } from 'vue';
import { useCountries } from '~/composables/useCountries.ts';

const countries = ref([]);
const searchQuery = ref('');
const error = ref(null);

const filteredCountries = computed(()=>{
  return countries.value.filter(country=>{
    return country.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim());
  });
});

try {
  countries.value = await useCountries();
} catch (err) {
  error.value = err;
}
</script>

<template>
  <div class="container">
    <div class="container-fluid row">
      <section class="cards col-3">
        <div class="cards__search">
          <form class="d-flex" @submit.prevent>
            <input class="form-control me-2" type="search" v-model="searchQuery" placeholder="Search" aria-label="Search">
          </form>
        </div>
        <div class="cards__list mt-2" v-if="filteredCountries.length">
          <div v-for="country in filteredCountries" :key="country.countryCode" class="card p-2 my-1">
            {{ country.name }}
          </div>
        </div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div>Loading countries...</div>
        </div>
      </section>
      <section class="widget col">
        widget
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>