const { ApolloServer} = require('apollo-server-express');
const { 
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground 
} = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { db } = require("./db");


const {resolvers} = require('./graphql/resolvers');
const {typeDefs} = require('./graphql/typeDefs');



async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);


  db();

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/'
  });

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 5000 }, resolve));
  console.log(`🚀 Server ready at ${process.env.NODE_ENV === 'production' ? 'https://glamour-gql.herokuapp.com/' : 'localhost:5000'}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);