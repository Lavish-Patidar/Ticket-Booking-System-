const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Booking {
    id: ID!
    user: String!
    destinationFrom: String!
    destinationTo: String!
    date: String!
  }

  type Query {
    getBooking: [Booking]
  }

  type Mutation {
    createBooking(
      user: String!
      destinationFrom: String!
      destinationTo: String!
      date: String!
    ): Booking

    updateBooking(id: ID!, destinationFrom: String, destinationTo: String, date: String,user: String ): Booking
    
     deleteBooking(id: ID!): Booking
  }
`;

module.exports = typeDefs;
