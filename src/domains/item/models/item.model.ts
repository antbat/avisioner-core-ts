import {Model, model, Schema} from 'mongoose';
import {config} from '../../../utils/config';
import {IItemDocument} from './item.interface';

const ObjectId = Schema.Types.ObjectId;
const ReferenceToUser = {type: ObjectId, ref: config.mongoDB.collection.user};

const itemSchema = new Schema({
    name: {type: String, index: true},
    description: {type: String},
    typeOfItem: {
        type: String,
        enum: ['text', 'number', 'boolean', 'date', 'currency', 'img', 'video', 'geo', 'technical'],
    },
    tuple: [{type: ObjectId}],
    previousVersionOf: ObjectId,
    owner: ReferenceToUser,
    editors: [ReferenceToUser],
    viewers: [ReferenceToUser],
});

export const Item: Model<IItemDocument> = model<IItemDocument>(config.mongoDB.collection.item, itemSchema);
