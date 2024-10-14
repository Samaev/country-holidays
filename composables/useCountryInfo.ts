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
    try {
        const response = await fetch(`https://date.nager.at/api/v3/CountryInfo/${code}`);

        if (!response.ok) {
            throw new Error(`Error fetching country info: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}