import { Client } from '@elastic/elasticsearch';
import { client } from '../connections/elasticSearch.connection';
import { config } from './Config';
import { getLogger } from './logger/logger';

const logger = getLogger(module);

export class ElasticsearchService {
    private static async isIndexExists(index: string): Promise<boolean> {
        const result: any = await client.indices.exists({ index });
        return result?.body;
    }
    private client: Client;
    constructor(esClient: any) {
        this.client = esClient;
    }
    public async wordIndexCreate() {
        const indexName = config.elasticSearch.index.user;
        const isExist = await ElasticsearchService.isIndexExists(indexName);
        if (!isExist) {
            await client.indices.create({
                index: indexName,
                body: elasticIndexBody
            });
            await client.indices.putMapping({
                index: indexName,
                body: elasticIndexMapping
            });
        }
    }
    public checkHealth() {
        this.client.cluster.health({}, (err, resp) => {
            if (err) {
                return logger.error(
                    'ES cluster health was retrieved with error',
                    err
                );
            }
            logger.debug('ES cluster health: ', resp);
        });
    }
}

const elasticIndexBody = {
    settings: {
        analysis: {
            analyzer: {
                english_exact: {
                    tokenizer: 'standard',
                    filter: ['lowercase']
                },
                phrase_analyzer: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: ['lowercase', 'shingle']
                }
            },
            filter: {
                shingle: {
                    type: 'shingle',
                    min_shingle_size: 2,
                    max_shingle_size: 3
                }
            }
        }
    }
};
const elasticIndexMapping = {
    properties: {
        displayName: {
            type: 'text',
            analyzer: 'english',
            fields: {
                phrase: {
                    type: 'text',
                    analyzer: 'phrase_analyzer'
                },
                exact: {
                    type: 'text',
                    analyzer: 'english_exact'
                },
                keyword: {
                    type: 'keyword',
                    ignore_above: 256
                },
                completion: {
                    type: 'completion',
                    preserve_separators: true,
                    preserve_position_increments: true,
                    max_input_length: 100
                }
            }
        }
    }
};
