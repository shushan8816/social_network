import { ConfigService } from '@nestjs/config';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
  }
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
  private getBoolean(key: string): boolean {
    return this.configService.get(key) === 'true';
  }
  private getNumber(key: string): number {
    return Number(this.configService.get(key));
  }
  private getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);
    if (isNil(value)) {
      throw new Error(`${key} environment variable doesn't exist`);
    }
    return value.replace(/\\n/g, '\n');
  }
  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];
    const migrations = [__dirname + '/../../migrations/*{.ts,.js}'];
    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: true,
      logging: this.isDevelopment,
    };
  }
}
