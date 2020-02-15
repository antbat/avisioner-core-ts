import {IItem, IItemDocument} from '../models/item.interface';
import {Item} from '../models/item.model';

export class ItemService {
    public static async create(item: IItem) {
        return Item.create(item);
    }

    public static async getById(id: string) {
        return Item.findById(id);
    }

    public static async update(newItem: IItemDocument) {
        if (!newItem) {
            throw new Error('no item data !! for update');
        }
        const formerItem = await Item.findById(newItem.id).lean();
        if (!formerItem) {
            throw new Error(`there is no item with ${newItem.id}`);
        }
        delete formerItem._id;
        formerItem.previousVersionOf = newItem.id;
        await Item.create(formerItem);
        await Item.create(newItem);
        return newItem;
    }
    public static async getBulkByIds(ids: string[]): Promise<IItem[]> {
        return Item.find({_id: { $in: ids}});
    }
}
