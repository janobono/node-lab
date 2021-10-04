import sequelize from '../index';
import { QueryTypes } from 'sequelize';

export const nextVal = (sequenceName: string): Promise<string> => {
    return sequelize.query<String>(
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
