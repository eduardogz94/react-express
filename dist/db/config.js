import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 4000,
    dbUrl: process.env.DATABASE_URL
};

export default config;