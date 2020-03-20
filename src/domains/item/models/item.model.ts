import { Model, model, Schema } from 'mongoose';
import { config } from '../../../utils/Config';
import { IItemDocument } from './item.interface';

const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
    name: { type: String, index: true },
    description: { type: String },
    typeOfItem: {
        type: String,
        enum: ['text', 'number', 'boolean', 'date', 'currency', 'img', 'video', 'geo', 'technical', 'context', 'projection'],
    },
    tuple: [{ type: ObjectId }],
    authMarkers: [{ type: ObjectId }],
    previousVersionOf: ObjectId,
    data: { type: Schema.Types.Mixed },
});

export const Item: Model<IItemDocument> = model<IItemDocument>(config.mongoDB.collection.item, itemSchema);
