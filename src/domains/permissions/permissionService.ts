import { IItem } from '../item/models/item.interface';
import { IRelation } from '../relation/models/relation.interface';

export enum Action {
    create = 'create',
    update = 'update',
    delete = 'delete',
    view = 'view'
}
export enum subjectOfAction {
    item = 'item',
    relation = 'relation'
}
export class PermissionService {
    public static async checkItems(
        whoUserId: string,
        action: Action,
        items: IItem[]
    ): Promise<boolean> {
        return true;
    }
    public static async checkRelation(
        whoUserId: string,
        action: Action,
        items: IRelation[]
    ): Promise<boolean> {
        return true;
    }
    public static async checkActionByAMs(
        who: string,
        action: Action,
        AMs: string[]
    ): Promise<boolean> {
        return true;
    }
}
