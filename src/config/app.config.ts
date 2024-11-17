import { registerAs } from '@nestjs/config';

export enum ConfigKeys {
  App = 'App',
  Db = 'Db',
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
  SERVER_PORT: 3000,
  SWAGGER_ENDPOINT: 'api-doc',
  SWAGGER_TITLE: 'Wallet-API',
  SWAGGER_DESCRIPTION: 'Api endpoints of a wallet application',
  SWAGGER_VERSION: '2.0.0',
  // SWAGGER_ADD_TAG: 'TEST',
}));

export const configurations = [AppConfig];
