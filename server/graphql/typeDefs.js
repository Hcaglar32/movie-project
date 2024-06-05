const { gql } = require('apollo-server');

module.exports = gql`
    type Message {
        text: String
        createdAt: String
        createdBy: String
    }

    type User {
        username: String
        email: String
        password: String
        token: String
        favoriteMovies: [String]
    }

    input MessageInput {
        text: String
        username: String
    }

    input RegisterInput {
        username: String
        email: String
        password: String
        confirmPassword: String
    }

    input LoginInput {
        email: String
        password: String
    }

    input AddMovieInput {
        movieId: Int!
        userId: String!
    }

    type Query {
        message(id: ID!): Message
        user(id: ID!): User
        getFavoriteMovies(userId: String): User
    }

    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        addFavoriteMovie(movieInput: AddMovieInput): User  
        removeFavoriteMovie(movieInput: AddMovieInput): User 
    }
`;
