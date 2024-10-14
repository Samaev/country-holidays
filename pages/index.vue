<script setup lang="ts">
import {ref} from 'vue';
import {useCountries} from '~/composables/useCountries.ts';
import {useRandomHolidays} from '~/composables/useRandomHolidays.ts';
import HolidayCard from "~/components/HolidayCard.vue";

interface Country {
  name: string;
  code: string;
}

interface Holiday {
  date: string;
  name: string;
  localName: string;
  countryCode: string;
}

const countries = ref<Country[]>([]);
const countryWidget = ref<Holiday[]>([]);
const searchQuery = ref<string>('');
const error = ref<string | null>(null);

const filteredCountries = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const isValidQuery = /^[a-zA-Z]+$/.test(query);

  return isValidQuery
      ? countries.value.filter(country => {
        return country.name.toLowerCase().includes(query);
      })
      : countries.value;
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
      <section class="cards col-5 col-md-3">
        <div class="cards__search">
          <input
              class="form-control"
              type="search"
              v-model.trim="searchQuery"
              placeholder="Search"
              aria-label="Search"
          />
        </div>
        <div class="cards__list mt-2" v-if="filteredCountries.length">
          <NuxtLink
              v-for="country in filteredCountries"
              :key="country.countryCode"
              class="card p-2 my-1"
              :to="`/${country.countryCode}`"
          >
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

      <section class="widget col-7 col-md-9 sticky-widget">
        <h3 class="lead text-center">Next Holidays</h3>
        <div class="card mb-3" v-for="(holiday, index) in countryWidget" :key="index">
          <HolidayCard :holiday="holiday" :country="holiday.countryName" />
        </div>
      </section>
    </div>
  </div>

</template>

<style scoped>
.sticky-widget {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
}
</style>