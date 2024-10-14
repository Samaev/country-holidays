<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { usePublicHolidays } from '~/composables/usePublicHolidays';
import { CountryInfo } from '~/composables/useCountryInfo';
const countryInfo = ref<CountryInfo | null>(null);

interface RouteParams {
  countryCode: string;
}

const route = useRoute();
const router = useRouter();

const holidays = ref<array[]>([]);
const selectedYear = ref<number>(new Date().getFullYear());

if (route.query.year) {
  selectedYear.value = parseInt(route.query.year as string, 10);
}

const countryCode = (route.params as RouteParams).countryCode;

async function fetchHolidays(year: number, countryCode: string) {
  try {
    holidays.value = await usePublicHolidays(year, countryCode);
  } catch (err) {
    console.error(err);
  }
}

const country = await useCountryInfo(countryCode);
if (country) {
  countryInfo.value = country;
}
watch(selectedYear, async (newYear) => {
  await fetchHolidays(newYear, countryCode);
  await router.push({ query: { ...route.query, year: newYear } });
});

await fetchHolidays(selectedYear.value, countryCode);
</script>


<template>
  <div class="container">
    <div class="breadcrumbs d-flex align-items-center justify-content-between my-1">
      <h2>{{ countryInfo.officialName  }}</h2>  <h2>{{ countryInfo.region }}</h2>
    </div>
    <div class="card mb-3" v-for="holiday in holidays" :key="holiday.name">
      <HolidayCard :holiday="holiday" :country="holiday.countryName" />
    </div>

    <nav aria-label="Year pagination" class="fixed-pagination">
      <ul class="pagination pagination-lg d-flex justify-content-center align-items-center">
        <li v-for="year in 11" :key="year" class="page-item"
            :class="{ active: selectedYear === 2020 + year - 1 }">
          <a class="page-link" href="#" @click.prevent="selectedYear = 2020 + year - 1">
            {{ 2020 + year - 1 }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.fixed-pagination {
  position: fixed;
  overflow: scroll;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
  opacity: 0.5;
}

.fixed-pagination:hover {
  background-color: rgba(255, 255, 255, 1);
  opacity: 1;
}

.fixed-pagination .page-link {
  color: #007bff;
  transition: color 0.3s ease-in-out;
}

.fixed-pagination .page-link:hover {
  color: #0056b3;
}

.fixed-pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
</style>