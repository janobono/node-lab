import { PrismaClient } from '@prisma/client';
import logger from './logger';

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient();
    db.$connect();
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
        global.__db.$connect();
    }
    db = global.__db;
}

export { db };

export const dbCheck = async () => {
    try {
        await db.nl_user.findFirst();
        await db.nl_todo.findFirst();
    } catch (error) {
        logger.error(error);
        return false;
    }
    return true;
}
