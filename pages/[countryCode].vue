<script setup lang="ts">
const holidays = ref([]);
let selectedYear = new Date().getFullYear();
try {
  holidays.value = await usePublicHolidays(selectedYear);
} catch (err) {
  console.error(err);
}
</script>

<template>
  <div class="container">
    <div class="card mb-3" v-for="holiday in holidays">
      <HolidayCard :holiday="holiday" :country="holiday.countryName"/>
    </div>
    <nav aria-label="...">
      <ul class="pagination pagination-lg">
        <li class="page-item active" aria-current="page">
          <span class="page-link">1</span>
        </li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
      </ul>
    </nav>
  </div>
</template>
