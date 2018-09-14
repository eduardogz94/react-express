import config from '../helpers/config';
import pgp from 'pg-promise';

const db = pgp()(process.env.DATABASE_URL || config.dbUrl);

export default db;
