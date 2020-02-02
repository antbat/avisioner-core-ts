import { IRelationModel} from './relation.interface';
import { Schema, Model, model} from 'mongoose'
import { config } from '../../../utils/config';

const ObjectId = Schema.Types.ObjectId;
const ItemRefType = { type: ObjectId, ref: config.mongoDB.collection.item };

const relationSchema = new Schema({
    what: ItemRefType,
    from: ItemRefType,
    to: ItemRefType,
    rate: { type: Number, default: 1},
    authMarker: { type: ObjectId }
});
export const Relation: Model<IRelationModel> = model<IRelationModel>(
    config.mongoDB.collection.relation,
    relationSchema
);
