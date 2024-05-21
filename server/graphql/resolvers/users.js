const { ApolloError } = require('apollo-server-errors');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                throw new ApolloError('Kullanıcı zaten daha önce bu email ile kayıt olmuş.' + email, 'USER_ALREADY_EXISTS');
            }

            var encryptedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );

            newUser.token = token;

            const res = await newUser.save();
            return {
                id: res.id,
                ...res.doc
            }
        },

        async loginUser(_, { loginInput: { email, password } }) {
            const user = await User.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                );
                user.token = token;

                return {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token: user.token
                };
            } else {
                throw new ApolloError('Şifre yanlış', 'INCORRECT_PASSWORD');
            }
        },

        async addFavoriteMovie(_, { movieInput: { movieId } }, context) {
            const user = await User.findById(context.user_id);
            if (!user) {
                throw new ApolloError('Kullanıcı bulunamadı', 'USER_NOT_FOUND');
            }

            user.favoriteMovies.push(movieId);
            await user.save();
            return user;
        },

        async removeFavoriteMovie(_, { movieInput: { movieId } }, context) {
            const user = await User.findById(context.user_id);
            if (!user) {
                throw new ApolloError('Kullanıcı bulunamadı', 'USER_NOT_FOUND');
            }

            user.favoriteMovies = user.favoriteMovies.filter(id => id !== movieId);
            await user.save();
            return user;
        }
    },
    Query: {
        message: (_, { ID }) => User.findById(ID),
        favoriteMovies: async (_, __, context) => {
            const user = await User.findById(context.user_id);
            if (!user) {
                throw new ApolloError('Kullanıcı bulunamadı', 'USER_NOT_FOUND');
            }
            return user.favoriteMovies;
        }
    }
}
