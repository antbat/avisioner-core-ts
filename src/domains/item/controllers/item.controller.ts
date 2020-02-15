import {Application, NextFunction, Request, Response} from 'express';
import {isObjectId} from '../../../connections/mongoDB.connection';
import {Controller, IController} from '../../../utils/Controller';
import {HttpError} from '../../../utils/HttpError';
import {IItem, IItemDocument} from '../models/item.interface';
import {ItemService} from '../services/Item.service';

export class ItemController extends Controller implements IController {
    constructor() {
        super('/item');
    }

    public registerRoutes(app: Application): void {
        app.route(this.url('/')).post(this.create);
        app.route(this.url('/:id')).get(this.getById);
        app.route(this.url('/getBulk')).post(this.getBulkByIds);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const itemData = req.body as unknown as IItem;
            const item = await ItemService.create(itemData);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            if (!isObjectId(id)) {
                return next(new Error('id is not valid'));
            }
            const item = await ItemService.getById(id);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
    public async getBulkByIds(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = req.body as string[];
            if (!ids) {
                return next( new HttpError(400, 'required array of ids'));
            }
            if (ids.length < 1) {
                res.send([]);
            }
            if (ids.some( (id) => !isObjectId(id)) ) {
                return next(new Error('id is not valid'));
            }
            const item = await ItemService.getBulkByIds(ids);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const itemData = req.body as unknown as IItemDocument;
            if (!itemData || !isObjectId(itemData._id)) {
                return next(new Error('valid _id field is required'));
            }
            const item = await ItemService.update(itemData);
            res.send(item);
        } catch (err) {
            next(err);
        }
    }
}
