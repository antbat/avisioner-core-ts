import { Item } from '../models/item.model';
import {IItem} from "../models/item.interface";

export class ItemService {
    static async create(item: IItem) {
        return Item.create(item);
    }
}
