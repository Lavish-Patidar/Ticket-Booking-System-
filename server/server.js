
const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const cors = require('cors');
const typeDefs = require('./schema/schema');
const resolvers = require('./routers/bookingRouters');
const connectDB = require('./config/db');
const dotenv = require('dotenv');




const app = express();
app.use(cors());
dotenv.config();

//conection to mongoDB
connectDB();

const serverStart = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;


    app.listen(port, () => {
        console.log(
            `Server is running on port : ${port}`
        );

    });
}

serverStart();