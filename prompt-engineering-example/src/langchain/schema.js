import { z } from 'zod';

export const bookingSchema = z.object({
    movieId : z
        .string()
        .nullable()
        .describe('ID för filmen som en användare vill boka'),
    title : z
        .string()
        .nullable()
        .describe('Titeln på filmen som användaren vill boka'),
    showtime : z
        .string()
        .nullable()
        .describe('Önskad visningstid i formatet HH:mm'),
    tickets : z
        .number()
        .int()
        .positive()
        .nullable()
        .describe('Antal biljetter som användaren vill boka')
});