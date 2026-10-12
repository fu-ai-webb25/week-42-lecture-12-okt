import { llm } from './llm';
import { bookingSchema } from './schema';
import { bookingPrompt } from './prompts';
import { movies } from '../data/movies';

const structuredLLM =  llm.withStructuredOutput(bookingSchema);

const bookingChain = bookingPrompt.pipe(structuredLLM);

export const interpretBooking = async (question) => {
    const booking = await bookingChain.invoke({
        movies : JSON.stringify(movies),
        question
    });
    console.log('BOOKING', booking);
    return booking;
}