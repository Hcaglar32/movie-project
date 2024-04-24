const { ApolloError } = require('apollo-server-errors');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            //Kullanıcı daha önce email ile kayıt olmuş mu kontrolü
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                throw new ApolloError('Kullanıcı zaten daha önce bu email ile kayıt olmuş.' + email, 'USER_ALREADY_EXISTS');
            }

            //Şifreleme
            var encryptedPassword = await bcrypt.hash(password, 10);


            //mongoose yapısını oluşturma (kullanıcı)
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            //jwt oluşturma
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );

            newUser.token = token;

            // veri tabanına kaydetme

            const res = await newUser.save();
            return {
                id: res.id,
                ...res.doc
            }
        },
        async loginUser(_, { loginInput: { email, password } }) {
            // kullanıcı var mı yok mu
            const user = await User.findOne({ email });
        
            // şifre şifrelenmiş şifreye eşit mi
            if (user && (await bcrypt.compare(password, user.password))) {
                // yeni token oluştur
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                );
                // kullanıcıya jeton ekle
                user.token = token;
        
                // kullanıcı bilgilerini döndür
                return {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token: user.token
                };
            } else {
                throw new ApolloError('Şifre yanlış', 'INCORRECT_PASSWORD');
            }
        }
        

    },
    Query: {
        message: (_, { ID }) => User.findById(ID)
    }
}
