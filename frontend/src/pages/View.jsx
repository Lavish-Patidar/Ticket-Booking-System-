import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import './View.css';

const GET_getBooking = gql`
  query {
    getBooking {
      id
      destinationFrom
      destinationTo
      date
      user
    }
  }
`;

const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $destinationFrom: String, $destinationTo: String, $date: String, $user: String) {
    updateBooking(id: $id, destinationFrom: $destinationFrom, destinationTo: $destinationTo, date: $date, user: $user) {
      id
      destinationFrom
      destinationTo
      date
      user
    }
  }
`;

const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      id
    }
  }
`;

const View = () => {
  const { loading, error, data, refetch } = useQuery(GET_getBooking);
  const [updateBooking] = useMutation(UPDATE_BOOKING);
  const [deleteBooking] = useMutation(DELETE_BOOKING);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    destinationFrom: '',
    destinationTo: '',
    date: '',
    user: '',

  });
  refetch();
  const handleEdit = (booking) => {
    setEditingBooking(booking.id);
    setFormData({
      destinationFrom: booking.destinationFrom,
      destinationTo: booking.destinationTo,
      date: booking.date,
      user: booking.user,
    });
    refetch();
  };

  const handleUpdate = async (id) => {
    await updateBooking({
      variables: {
        id,
        destinationFrom: formData.destinationFrom,
        destinationTo: formData.destinationTo,
        date: formData.date,
        user: formData.user,
      },
    });

    alert('The Ticket is updated')
    refetch();

    setEditingBooking(null);
  };

  const handleDelete = async (id) => {
    await deleteBooking({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="view">
      <div className="view-container">
        <h1>View Booking</h1>
        {data.getBooking && data.getBooking.length > 0 ? (
          data.getBooking.map((booking) => (
            <div key={booking.id} className="booking-card">
              {editingBooking === booking.id ? (
                <div className='edit-container'>
                  <h1>Edit</h1>
                  <input
                    type="text"
                    value={formData.user}
                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    placeholder="User"
                  />
                  <input
                    type="text"
                    value={formData.destinationFrom}
                    onChange={(e) => setFormData({ ...formData, destinationFrom: e.target.value })}
                    placeholder="From"
                  />
                  <input
                    type="text"
                    value={formData.destinationTo}
                    onChange={(e) => setFormData({ ...formData, destinationTo: e.target.value })}
                    placeholder="To"
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Date"
                  />

                  <button className="update" onClick={() => handleUpdate(booking.id)}>Save</button>
                </div>
              ) : (
                <div className='card-box'>
                  <p className='user-box'><strong>User:</strong> {booking.user}</p>
                  <p><strong>From:</strong> {booking.destinationFrom}</p>
                  <p><strong>To:</strong> {booking.destinationTo}</p>
                  <p className='user-box'><strong>Date:</strong> {booking.date}</p>
                  <div className="booking-actions">
                    <button className="update" onClick={() => handleEdit(booking)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(booking.id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-getBooking">No Booking found.</p>
        )}
      </div>
    </div>
  );
};

export default View;
