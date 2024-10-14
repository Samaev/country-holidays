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
export const usePublicHolidays = async (year: number, countryCode: string): Promise<PublicHoliday[]> => {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

    try {
        return await $fetch<PublicHoliday[]>(url);
    } catch (error) {
        throw new Error(`Failed to fetch holidays: ${error.message}`);
    }
};
