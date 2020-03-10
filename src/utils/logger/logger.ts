import { createCustomLogger } from '@antbat/ts-logger-es';
import { client } from '../../connections/elasticSearch.connection';
import { config } from '../Config';

export const getLogger = createCustomLogger(config.logging, client);
