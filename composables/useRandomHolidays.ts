import {ref} from "vue";

export interface PublicHoliday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    global: boolean;
    counties: string[];
    launchYear: number;
    types: string[];
}
export interface Country {
    countryCode: string;
    name: string;
}
export const useRandomHolidays = async (countries: Country[]): Promise<PublicHoliday[]> => {
    if (countries.length < 3) {
        throw new Error('Not enough countries');
    }

    const randomIndices = new Set<number>();
    while (randomIndices.size < 3) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        randomIndices.add(randomIndex);
    }

    const selectedCountries = Array.from(randomIndices).map(index => countries[index]);
    const countryCodes = selectedCountries.map(country => country.countryCode);

    const countryWidget = ref<PublicHoliday[]>([]); // Typing the ref as PublicHoliday array

    const requests = countryCodes.map(async (countryCode, index) => {
        const response = await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`);
        const data: PublicHoliday[] = await response.json(); // Type assertion

        return data && data.length ? { ...data[0], countryName: selectedCountries[index].name } : null;
    });

    const results = await Promise.all(requests);

    countryWidget.value = results.filter(holiday => holiday !== null) as PublicHoliday[]; // Type assertion

    return countryWidget.value;
};
