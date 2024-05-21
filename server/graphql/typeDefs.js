const { gql } = require('apollo-server');

module.exports = gql`
    type Message {
        text: String,
        createdAt: String,
        createdBy: String
    }

    type User {
        username: String,
        email: String,
        password: String,
        token: String,
        favoriteMovies: [String]  // Favori filmler listesi
    }

    input MessageInput {
        text: String,
        username: String
    }

    input RegisterInput {
        username: String,
        email: String,
        password: String,
        confrimPassword: String
    }

    input LoginInput {
        email: String,
        password: String
    }

    input AddMovieInput {
        movieId: String!
    }

    type Query {
        message(id: ID!): Message
        user(id: ID!): User
        favoriteMovies: [String]  // Favori filmler sorgusu
    }

    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        addFavoriteMovie(movieInput: AddMovieInput): User  
        removeFavoriteMovie(movieInput: AddMovieInput): User 
    }
`;
