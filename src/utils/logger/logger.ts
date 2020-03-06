import * as path from 'path';
import { createLogger, Logger, LoggerOptions, transports } from 'winston';
import { client } from '../../connections/elasticSearch.connection';
import { config } from '../IConfig';
import { ElasticsearchWinstonTransport } from './ElasticsearchWinstonTransport';

const defaultLevel = process.env.LOG_LEVEL;
const env = process.env.NODE_ENV || 'undefined NODE_ENV';

export interface ILogModuleLabel {
    filename: string;
}
const getLabel = (callingModule: ILogModuleLabel): string => {
    const breadCrumbs = callingModule.filename.split(path.sep);
    return breadCrumbs[breadCrumbs.length - 1];
};

export const getLogger = (module: ILogModuleLabel): Logger => {
    const options: LoggerOptions = {
        exitOnError: false,
        level: defaultLevel,
        transports: [
            new ElasticsearchWinstonTransport({
                client,
                index: config.logging.error,
                label: getLabel(module),
                level: 'error',
                env
            })
        ]
    };
    const oneLogger = createLogger(options);
    if (process.env.NODE_ENV === 'development') {
        const transport = new transports.Console({
            level: 'debug' // debug and below to console
        });
        oneLogger.add(transport);

        const debugElasticTransport = new ElasticsearchWinstonTransport({
            client,
            index: config.logging.default,
            label: getLabel(module),
            level: 'debug',
            env
        });
        oneLogger.add(debugElasticTransport);
    }
    return oneLogger;
};
