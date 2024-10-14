export const useCountries = async () => {
    const { data, error } = await useFetch('https://date.nager.at/api/v3/AvailableCountries');

    if (error.value) {
        throw new Error('Error fetching countries');
    }

    return data.value;
};
