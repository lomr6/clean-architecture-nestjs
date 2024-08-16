import { config } from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  config({ path: `${process.cwd()}/.env.test` });
} else {
  config({ path: `${process.cwd()}/.env` });
}

export default () => ({
  app_name: process.env.APP_NAME,
  app_description: process.env.APP_DESCRIPTION,
  app_url: process.env.APP_URL,
  api_version: process.env.API_VERSION,
  node_env: process.env.NODE_ENV || 'development',
  host: process.env.HOST,
  port: parseInt(process.env.PORT || '4000'),
  database: {
    connection: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
  },
});
