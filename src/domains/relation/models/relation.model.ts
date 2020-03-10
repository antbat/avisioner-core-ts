import { Model, model, Schema} from 'mongoose';
import { config } from '../../../utils/Config';
import { IRelationModel} from './relation.interface';

const ObjectId = Schema.Types.ObjectId;
const ItemRefType = { type: ObjectId, ref: config.mongoDB.collection.item };

const relationSchema = new Schema({
    what: ItemRefType,
    from: ItemRefType,
    to: ItemRefType,
    rate: { type: Number, default: 1},
    authMarkers: [{ type: ObjectId }],
});
export const Relation: Model<IRelationModel> = model<IRelationModel>(
    config.mongoDB.collection.relation,
    relationSchema,
);
