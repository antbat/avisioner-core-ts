import { Document } from 'mongoose';
export interface IRelation {
    what: string;
    from: string;
    to: string;
    rate: number;
    authMarkers: string[];
}
export interface IRelationModel extends IRelation, Document {}
