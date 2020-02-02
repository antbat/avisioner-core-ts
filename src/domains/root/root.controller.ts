import { Application, Request, Response, NextFunction } from 'express';
import { Controller, IController } from '../../utils/Controller';


export class RootController extends Controller implements IController {
    constructor() {
        super('/');
    }
    registerRoutes(app: Application): void {
        app.route(this.url('')).get(this.getMessage);
    }

    public async getMessage(req: Request, res: Response, next: NextFunction) {
        try {
            return  res.send({msg: 'seed'});
        } catch (err) {
            next(err)
        }
    }
}
