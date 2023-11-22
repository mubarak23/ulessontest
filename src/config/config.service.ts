import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: any };

  private readonly config = {
    DB_PORT: Number(process.env.DB_PORT),
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),
    DB_HOST: process.env.DB_HOST,
    DB_TYPE: process.env.DB_TYPE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_SYNC: process.env.DB_SYNC,
  };

  constructor() {
    dotenv.config();

    if (process.env.APP_ENV === 'production') {
      this.envConfig = {
        DB_PORT: Number(process.env.DB_PORT),
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),
        DB_HOST: process.env.DB_HOST,
        DB_TYPE: process.env.DB_TYPE,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_SYNC: process.env.DB_SYNC,
      };
    } else {
      this.envConfig = {
        DB_PORT: Number(process.env.DB_PORT),
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),
        DB_HOST: process.env.DB_HOST,
        DB_TYPE: process.env.DB_TYPE,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_SYNC: process.env.DB_SYNC,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}
