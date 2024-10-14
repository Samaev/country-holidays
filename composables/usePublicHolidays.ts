import { useFetch } from '#app';
import { useRoute } from 'vue-router';
export const usePublicHolidays = async ( year) => {
    const route = useRoute();
    const countryCode = route.params.countryCode;
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

    const { data, error } = await useFetch(url);


    if (error.value) {
        throw new Error(`Failed to fetch holidays: ${error.value.message}`);
    }

    return data.value;
};
