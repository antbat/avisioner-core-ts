import { Controller, IController} from "../../../utils/Controller";
import { Application, NextFunction, Request, Response } from "express";
import { ItemService } from '../services/Item.service';
import {IItem} from "../models/item.interface";

export class ItemController extends  Controller implements IController {
    constructor() {
        super('/item')
    }
    registerRoutes(app: Application): void {
        app.route(this.url('/')).post(this.create)
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const itemData = req.body as unknown as IItem;
            const item = await ItemService.create(itemData);
            res.send(item)
        } catch (err) {
            next(err)
        }
    }
}
