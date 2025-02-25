import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './Book.css';

const CREATE_BOOKING = gql`
  mutation CreateBooking($destinationFrom: String!, $destinationTo: String!, $date: String!, $user: String!) {
    createBooking(destinationFrom: $destinationFrom, destinationTo: $destinationTo, date: $date, user: $user) {
      id
      destinationFrom
      destinationTo
      date
      user
    }
  }
`;

const Book = () => {
    const [formData, setFormData] = useState({
        destinationFrom: '',
        destinationTo: '',
        date: '',
        user: '',
    });

    const [createBooking] = useMutation(CREATE_BOOKING);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createBooking({
                variables: formData,
            });
            console.log(data);
            alert('Booking Successfull');
            setFormData({
                destinationFrom: '',
                destinationTo: '',
                date: '',
                user: ''
            })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="book">
            <div className="book-container">
                <h1>Book Your Ticket</h1>
                <form onSubmit={handleSubmit} className="book-form">
                    <label>User</label>
                    <input
                        type="text"
                        value={formData.user}
                        onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                        required
                    />
                    <label>From</label>
                    <input
                        type="text"
                        value={formData.destinationFrom}
                        onChange={(e) => setFormData({ ...formData, destinationFrom: e.target.value })}
                        required
                    />
                    <label>To</label>
                    <input
                        type="text"
                        value={formData.destinationTo}
                        onChange={(e) => setFormData({ ...formData, destinationTo: e.target.value })}
                        required
                    />
                    <label>Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />

                    <button type="submit">Book</button>
                </form>
            </div>
        </div>
    );
};

export default Book;
