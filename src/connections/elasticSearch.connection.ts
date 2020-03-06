import { Client } from '@elastic/elasticsearch';
import { config } from '../utils/IConfig';
export const client = new Client(config.elasticSearch.options);
