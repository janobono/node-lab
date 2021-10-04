import sequelize from '../index';
import { QueryTypes } from 'sequelize';

export const nextVal = (sequenceName: string): Promise<BigInt> => {
    return sequelize.query<BigInt>(
        'SELECT nextval($1)',
        {
            bind: [sequenceName],
            type: QueryTypes.SELECT,
            plain: true
        }
    ).then(
        result => {
            // @ts-ignore
            return result.nextval;
        }
    );
}

export const currVal = (sequenceName: string): Promise<BigInt> => {
    return sequelize.query<BigInt>(
        'SELECT currval($1)',
        {
            bind: [sequenceName],
            type: QueryTypes.SELECT,
            plain: true
        }
    ).then(
        result => {
            // @ts-ignore
            return result.currval;
        }
    );
}
