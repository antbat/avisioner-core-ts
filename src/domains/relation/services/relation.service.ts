import { Action, PermissionService } from '../../permissions/permissionService';
import { IRelation, IRelationModel } from '../models/relation.interface';
import { Relation } from '../models/relation.model';

export class RelationService {
    public static async create(
        who: string,
        data: IRelation
    ): Promise<IRelationModel | null> {
        if (await PermissionService.checkRelation(who, Action.create, [data])) {
            return Relation.create(data);
        }
        return null;
    }
    public static async update(
        who: string,
        data: IRelationModel
    ): Promise<IRelationModel | null> {
        if (await PermissionService.checkRelation(who, Action.update, [data])) {
            const former = await Relation.findById(data.id);
            if (!former) {
                throw new Error(`Relation with id ${data.id} was not found`);
            }
            former.rate = data.rate;
            return former.save();
        }
        return null;
    }
    public static async remove(
        who: string,
        relationId: string
    ): Promise<IRelationModel | null> {
        const forDelete = await Relation.findById(relationId);
        if (!forDelete) {
            throw new Error(`Relation with id ${relationId} was not found`);
        }
        if (await PermissionService.checkRelation(who, Action.delete, [forDelete])) {
            return forDelete.remove();
        }
        return null;
    }
}
