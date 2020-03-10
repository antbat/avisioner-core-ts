import { Client } from '@elastic/elasticsearch';
import { config } from '../utils/Config';
export const client = new Client(config.elasticSearch.options);
