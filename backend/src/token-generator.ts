import crypto from 'crypto';
import * as jwt from './jwt';

const secret = crypto.randomBytes(64).toString('hex');
console.log('secret:', secret);

const token = jwt.generateToken({
        username: 'test',
        firstName: 'Jimbo',
        lastName: 'Pytlik',
        email: 'jimbo.pytlik@anymail.org',
        roles: ['role01', 'role02']
    },
    secret, {issuer: 'test', expiresIn: '1h'});
console.log('token:', token);

const payload = jwt.decodeToken(token);
console.log('payload:', payload);

jwt.verifyToken(token, secret, (err, decoded) => {
    console.log(err);
    console.log(decoded);
})
