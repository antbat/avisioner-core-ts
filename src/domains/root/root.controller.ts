import { Application, NextFunction, Request, Response } from 'express';
import { Controller, IController } from '../../utils/Controller';

export class RootController extends Controller implements IController {
    constructor() {
        super('/');
    }
    public registerRoutes(app: Application): void {
        app.route(this.url('')).get(this.getMessage);
    }

    public async getMessage(req: Request, res: Response, next: NextFunction) {
        try {
            return  res.send({msg: 'seed'});
        } catch (err) {
            next(err);
        }
    }
}
