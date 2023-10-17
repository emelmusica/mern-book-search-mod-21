const { gql } = require('apollo-server');

const typeDefs = gql`
  type Tech {
    _id: ID!
    name: String!
  }

  type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    # Add other user-related fields as needed
  }

  type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
    me: User # Add the 'me' query to return a User
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
    # Add other mutations as needed
  }
`;

module.exports = typeDefs;
