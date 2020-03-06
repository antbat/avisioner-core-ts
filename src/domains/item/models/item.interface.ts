import { Document } from 'mongoose';

export enum TypeOfItem {
    text = 'text',
    number = 'number',
    boolean = 'boolean',
    date = 'date',
    currency = 'currency',
    img = 'img',
    video = 'video',
    geo = 'geo',
    technical = 'technical',
}
export interface IItem {
    name: string;
    description: string;
    typeOfItem: TypeOfItem;
    tuple: string[];
    authMarkers: string[];
    previousVersionOf: string;
    data: any;
}

export interface IItemDocument extends IItem, Document {}
