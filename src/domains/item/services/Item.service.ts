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
        const item = await Item.findById(newItem._id).lean();
        if (!item) {
            throw new Error(`there is no item with ${newItem.id}`);
        }
        delete item._id;
        item.previousVersionOf = newItem._id;
        await Item.create(item);

        const preUpdatedItem = new Item(newItem);
        preUpdatedItem.isNew = false;
        await preUpdatedItem.save();
        return preUpdatedItem;
    }
    public static async getBulkByIds(ids: string[]): Promise<IItem[]> {
        return Item.find({_id: { $in: ids}});
    }
}
