import { Document } from 'mongoose';
export interface IRelation {
    what: string;
    from: string;
    to: string;
    rate: number;
    authMarker: string;
}
export interface IRelationModel extends IRelation, Document {}
