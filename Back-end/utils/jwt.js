import jwt from 'jsonwebtoken';

const secret = `${process.env.JWT_SECRET}`;

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username:user.userName,
            email: user.email,
            isAdmin: user.isAdmin
        },
        secret, { expiresIn: '24h' }); 
};

export const verifyToken = (token) => {
    return jwt.verify(token, secret);
};