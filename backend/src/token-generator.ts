import crypto from 'crypto';
import * as jwt from './jwt';
import { hashPassword } from './password';

const secret = crypto.randomBytes(64).toString('hex');
console.log('secret:', secret);

const token = jwt.generateToken({
        username: 'test',
        firstName: 'Jimbo',
        lastName: 'Pytlik',
        email: 'jimbo.pytlik@anymail.org'
    },
    secret, {issuer: 'test', expiresIn: '1h'});
console.log('token:', token);

const payload = jwt.decodeToken(token);
console.log('payload:', payload);

hashPassword('pass123').then(result => console.log(result));

jwt.verifyToken(token, secret, (err, decoded) => {
    console.log(err);
    console.log(decoded);
})
