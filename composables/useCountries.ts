export interface Country {
    countryCode: string;
    name: string;
}
export const useCountries = async (): Promise<Country[]> => {
    const { data, error } = await useFetch<Country[]>('https://date.nager.at/api/v3/AvailableCountries');

    if (error.value) {
        throw new Error('Error fetching countries');
    }

    return data.value;
};
