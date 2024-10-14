<script setup lang="ts">
import {ref} from 'vue';
import {useCountries} from '~/composables/useCountries.ts';
import {useRandomHolidays} from '~/composables/useRandomHolidays.ts';

const countries = ref([]);
const countryWidget = ref([]);
const searchQuery = ref('');
const error = ref(null);

const filteredCountries = computed(() => {
  return countries.value.filter(country => {
    return country.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

try {
  countries.value = await useCountries();
  countryWidget.value = await useRandomHolidays(countries.value);
} catch (error) {
  console.error(error);
}

</script>

<template>
  <div class="container">
    <div class="container-fluid row">
      <section class="cards col-3">
        <div class="cards__search">
          <form class="d-flex" @submit.prevent>
            <input class="form-control me-2" type="search" v-model.trim="searchQuery" placeholder="Search"
                   aria-label="Search">
          </form>
        </div>
        <div class="cards__list mt-2" v-if="filteredCountries.length">
          <NuxtLink v-for="country in filteredCountries" :key="country.countryCode" class="card p-2 my-1"
                    :to="`/${country.countryCode}`">
            {{ country.name }}
          </NuxtLink>
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
        <h3 class="lead text-center">Next Holidays</h3>
        <div class="card mb-3" v-for="(holiday,index) of countryWidget" :key="index">
          <div class="card-header">
            Date: {{ holiday.date }}
          </div>
          <div class="card-body">
            <h5 class="card-title">Name: {{ holiday.name }}</h5>
            <p class="card-text">Local name: {{ holiday.localName }}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <div>Country:</div>
            <button class="btn btn-primary"><NuxtLink :to="`/${holiday.countryCode}`"><span class="text-white">{{ holiday.countryName }}</span></NuxtLink></button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
