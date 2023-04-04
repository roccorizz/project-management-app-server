const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Create Apollo Server instance
// const server = new ApolloServer({ schema });

// // Mount Apollo Server middleware
// server.applyMiddleware({ app, path: '/graphql' });


app.use(
    '/api/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    })
);



// Test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
