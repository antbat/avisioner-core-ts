import { Application, NextFunction, Request, Response } from 'express';
import { isObjectId } from '../../../connections/mongoDB.connection';
import { Controller, IController } from '../../../utils/Controller';
import { IRelation, IRelationModel } from '../models/relation.interface';
import { RelationService } from '../services/relation.service';

export class RelationController extends Controller implements IController {
    constructor() {
        super('/relation');
    }

    public registerRoutes(app: Application): void {
        app.route(this.url('/')).post(this.create);
        app.route(this.url('/')).put(this.update);
        app.route(this.url('/:id')).put(this.delete);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const relationData = (req.body as unknown) as IRelation;
            const userId = ((req as unknown) as any).user.id;
            const item = await RelationService.create(userId, relationData);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const relationData = (req.body as unknown) as IRelationModel;
            if (!relationData || !isObjectId(relationData._id)) {
                return next(new Error('valid _id field is required'));
            }
            const userId = ((req as unknown) as any).user.id;

            const item = await RelationService.update(userId, relationData);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const relationId = req.params.id;
            if (!isObjectId(relationId)) {
                return next(new Error('valid _id field is required'));
            }
            const userId = ((req as unknown) as any).user.id;
            const result = await RelationService.remove(userId, relationId);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
}
