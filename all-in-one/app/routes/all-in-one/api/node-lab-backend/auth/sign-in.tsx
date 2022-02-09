import type { ActionFunction } from 'remix';
import { json } from 'remix';
import APP_CONFIG from '~/utils/config.server';
import { db } from '~/utils/db.server';
import { generateToken, hashPassword } from '~/utils/jwt.server';

export const action: ActionFunction = async ({request}) => {
    if (request.method === 'POST') {
        return signIn(request);
    }
    return json({message: 'Method not allowed'}, 405);
};

export const signIn = async (request: Request) => {
    try {
        const {username, password, firstName, lastName, email} = await request.json();

        const usersCount = await db.nl_user.count({
            where: {username}
        });

        if (usersCount === 0) {
            const password_ = await hashPassword(password);
            const user = await db.nl_user.create({
                data: {
                    username,
                    password: password_,
                    first_name: firstName,
                    last_name: lastName,
                    email
                }
            });
            const result = {
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            };
            const token = generateToken(
                {...result},
                APP_CONFIG.TOKEN_SECRET!,
                {
                    issuer: APP_CONFIG.TOKEN_ISSUER,
                    expiresIn: APP_CONFIG.TOKEN_EXPIRES_IN
                }
            );
            return json({user: result, token}, 201);
        } else {
            return json({message: `User ${username} is already exists!`}, 400);
        }
    } catch (error) {
        console.log(error);
        return json({error}, 500);
    }
}
