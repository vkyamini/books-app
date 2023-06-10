const {gql} = require("apollo-server-express");

const typeDefs = gql`
    type Book {
        _id: ID
        title: String
        image: String
        bookId: String
        description: String
        authors: [String]
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        me(id: ID!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(userId: String!, authors: [String]!, description: String!, title: String!, bookId: String!, image: String!, link: String! ): User
        removeBook(userId: String!, bookId: String!): User
    }
`

module.exports = typeDefs;

// how do you handle different status codes?