const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema'); // Import GraphQL schema
const resolvers = require('./graphql/resolvers'); // Import GraphQL resolvers
const db = require('./config/connection');
const routes = require('./routes');
const path = require('path');
const { authMiddleware } = require('./auth'); // Import authentication middleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define your Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Extract user information from request headers or cookies
    const token = req.headers.authorization || '';
    const user = authMiddleware({ req }); // Use your authentication middleware
    return { user };
  },
});


server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
