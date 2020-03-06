import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Application } from 'express';
import { Logger } from 'winston';
import { client } from './connections/elasticSearch.connection';
import { mongooseConnection } from './connections/mongoDB.connection';
import { ItemController } from './domains/item/controllers/item.controller';
import { RelationController } from './domains/relation/controllers/Relation.controler';
import { IController } from './utils/Controller';
import { ElasticsearchService } from './utils/elasticsearch.service';
import { HttpError } from './utils/HttpError';
import { getLogger } from './utils/logger/logger';
import { checkJwt } from './utils/middleware/auth.middleware';

const logger = getLogger(module);

export class App {
    public application: Application;
    private logger: Logger;

    constructor(controllers: IController[], middleware: any[]) {
        this.logger = logger;
        this.application = express();

        middleware.forEach(one => this.application.use(one));
        controllers.forEach(controller =>
            controller.registerRoutes(this.application)
        );

        this.application.use(
            (
                error: HttpError,
                request: Request,
                response: Response,
                next: NextFunction
            ) => {
                const status = error.status || 500;
                const message = error.message || 'Something went wrong';
                response.status(status).send({
                    status,
                    message
                });
            }
        );
    }

    public listen(port: number) {
        this.application.listen(port, () => {
            this.logger.info(`the application are listening on ${port}`);
        });
    }
}

export async function getApp(): Promise<App> {
    const elasticsearchService = new ElasticsearchService(client);

    await elasticsearchService.wordIndexCreate();
    elasticsearchService.checkHealth();

    await mongooseConnection;

    // express application init
    const controllers = [new ItemController(), new RelationController()];
    const middleware: any[] = [
        cors(),
        bodyParser.json({ limit: '50mb' }),
        bodyParser.urlencoded({ extended: false }),
        checkJwt
    ];
    return new App(controllers, middleware);
}
