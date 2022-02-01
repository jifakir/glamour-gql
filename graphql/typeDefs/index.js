const { gql } = require('apollo-server-express');

module.exports.typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Product {
    id: ID!
    title: String!
    description: String!
    imgUrl: String!
    price: Int!
    discount: Int
    sku: String!
    category: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    users: [User!]!
    user(id: ID!): User
  }

  #The "Mutation" is special:

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    removeUser(id: ID!): User
    login(email: String!, password: String!): User
    addProduct(title: String!, description: String!, imgUrl: String!, price: Int!, discount: Int!, sku: String!, category: String!): Product
    removeProduct(id: ID!): Product
  }
  
`;
