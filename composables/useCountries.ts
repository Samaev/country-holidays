export interface Country {
    countryCode: string;
    name: string;
}
export const useCountries = async (): Promise<Country[]> => {
    const { public: { URI_API } } = useRuntimeConfig();
    const { data, error } = await useFetch<Country[]>(URI_API+'/AvailableCountries');

    if (error.value) {
        throw new Error('Error fetching countries');
    }

    return data.value;
};
