import {ref} from "vue";

export const useRandomHolidays = async (countries) => {
    if (countries.length < 3) {
        throw new Error('Not enough countries');
    }


    const randomIndices = new Set();
    while (randomIndices.size < 3) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        randomIndices.add(randomIndex);
    }


    const selectedCountries = Array.from(randomIndices).map(index => countries[index]);
    const countryCodes = selectedCountries.map(country => country.countryCode);

    const countryWidget = ref([]);

    const requests = countryCodes.map(async (countryCode, index) => {
        const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`);
        const data = await response.json();


        return data && data.length ? {...data[0], countryName: selectedCountries[index].name} : null;
    });

    const results = await Promise.all(requests);


    countryWidget.value = results.filter(holiday => holiday !== null);

    return countryWidget.value;
};
