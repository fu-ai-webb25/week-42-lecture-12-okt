import Message from '../message/Message';
import Loading from '../loading/Loading';
import './chat.css';
import { useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';

const Chat = () => {
    const { 
        messages, 
        getAnswer, 
        isLoading, 
        error, 
        clearHistory,
        createBookingPreview,
        booking,
        bookingError 
    } = useChat();
    const inputRef = useRef();
    
    // Hanterar scrollningen på sidan vid nya meddelanden
    const messagesRef = useRef(null);
    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop =
                messagesRef.current.scrollHeight;
        }
    }, [messages, isLoading]); 
    
    useEffect(() => {
        console.log(booking);
    }, [booking]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInput = inputRef.current.value;
        inputRef.current.value = '';
        getAnswer(userInput);
    }

    const messageComponents = messages.map((message, index) => {
        const role = message.getType() === 'human'
            ? 'user'
            : 'assistant';
        
        return <Message 
            key={ index }
            content={ message.content }
            role={ role }
        />
    });

    const handleBooking = () => {
        const userInput = inputRef.current.value;
        inputRef.current.value = '';
        createBookingPreview(userInput);
    }

    return (
        <main className="chat">
            {
                booking && (
                    <div className="booking">
                        <p>Film-ID: {booking.movieId ?? 'Saknas'}</p>
                        <p>Titel: {booking.title ?? 'Saknas'}</p>
                        <p>Visning: {booking.showtime ?? 'Saknas'}</p>
                        <p>Biljetter: {booking.tickets ?? 'Saknas'}</p>
                    </div>
                )
            }
            <section className="chat__messages" ref={ messagesRef }>
                { messageComponents }
                { isLoading && <Loading /> }
                { error && <p>{ error }</p> }
            </section>
            <form className="chat__form" onSubmit={ handleSubmit }>
                <input type="text" className="chat__input" ref={ inputRef } />
                <button className="chat__submit">Skicka</button>
                <button type="button" className="chat__submit" onClick={ clearHistory } >Clear</button>
                <button type="button" className="chat__submit" onClick={ handleBooking } >Book tickets</button>
            </form>

        </main>
    )
}

export default Chat;