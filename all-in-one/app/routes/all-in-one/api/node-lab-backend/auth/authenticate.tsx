import type { ActionFunction } from 'remix';
import { json } from 'remix';
import APP_CONFIG from '~/utils/config.server';
import { db } from '~/utils/db.server';
import { generateToken, verifyPassword } from '~/utils/jwt.server';

export const action: ActionFunction = async ({request}) => {
    if (request.method === 'POST') {
        return await authenticate(request);
    }
    return json({message: 'Method not allowed'}, 405);
};

export const authenticate = async (request: Request) => {
    try {
        const {username, password} = await request.json();
        const user = await db.nl_user.findUnique({
            where: {username}
        });
        if (user) {
            const result = {
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            };
            if (await verifyPassword(password, user.password)) {
                const token = generateToken(
                    {...result},
                    APP_CONFIG.TOKEN_SECRET!,
                    {
                        issuer: APP_CONFIG.TOKEN_ISSUER!,
                        expiresIn: APP_CONFIG.TOKEN_EXPIRES_IN!
                    }
                );
                return json({user: result, token}, 200);
            } else {
                return json({message: 'Invalid password'}, 400);
            }
        } else {
            return json({message: 'Invalid username'}, 400);
        }
    } catch (error) {
        console.log(error);
        return json({error}, 500);
    }
}
