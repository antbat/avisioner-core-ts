/*
    wrapper under config package
    added only auto suggest IDE sugar by interface
 */
import { ILoggerConfig } from '@antbat/ts-logger-es';
import currentConfig from 'config';

export interface IConfig {
    port: number;
    logging: ILoggerConfig;
    mongoDB: {
        connectionString: string;
        collection: {
            item: string;
            relation: string;
        };
    };
    elasticSearch: {
        index: {
            user: string;
        };
        options: {
            node: string;
            log: string;
            keepAlive: boolean;
        };
    };
    JWT: {
        secret: string;
        expiresIn: string;
    };
}

export const config: IConfig = currentConfig as any;
