export interface BorderCountry {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: BorderCountry[] | null;
}
export interface CountryInfo {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: BorderCountry[];
}

export async function useCountryInfo(code: string): Promise<CountryInfo | null> {
    const { public: { URI_API } } = useRuntimeConfig();
    try {
        const response = await fetch(URI_API+`/CountryInfo/${code}`);

        if (!response.ok) {
            throw new Error(`Error fetching country info: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}