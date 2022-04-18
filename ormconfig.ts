import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
const configs: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['src/migrations/*{.ts,.js}'],
  entities: ['src/modules/**/*.entity{.ts,.js}'],
};
module.exports = configs;
