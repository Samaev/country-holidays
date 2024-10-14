export const usePublicHolidays = async (year: number, countryCode: string) => {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

    try {
        // Use $fetch directly without importing it
        return await $fetch(url);
    } catch (error) {
        throw new Error(`Failed to fetch holidays: ${error.message}`);
    }
};
