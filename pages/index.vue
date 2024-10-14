<script setup lang="ts">
import { ref } from 'vue';
import { useCountries } from '~/composables/useCountries.ts';

const countries = ref([]);
const error = ref(null);

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
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <div class="cards__list mt-2">
          <div v-for="country in countries" :key="country.countryCode" class="card p-2 my-1">
            {{ country.name }}
          </div>
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