const Booking = require("../models/Booking");

const resolvers = {
    Query: {
        getBooking: async () => {
            return await Booking.find();
        },
    },
    Mutation: {
        createBooking: async (
            _,
            { user, destinationFrom, destinationTo, date }
        ) => {
            const booking = new Booking({
                user,
                destinationFrom,
                destinationTo,
                date,
            });
            await booking.save();
            return booking;
        },

        updateBooking: async (_, { id, user, destinationFrom, destinationTo, date }) => {
            const booking = await Booking.findByIdAndUpdate(id,
                { user, destinationFrom, destinationTo, date },
                { new: true });
            return booking;
        },

        deleteBooking: async (_, { id }) => {
            const booking = await Booking.findByIdAndDelete(id);
            return booking;
        },
    },
};

module.exports = resolvers;
