import chai = require('chai');
import chaiHttp = require('chai-http');
import { Application } from 'express';
import 'mocha';
import { getApp } from '../../../app';
import { IItemDocument, TypeOfItem } from '../../item/models/item.interface';
import { Item } from '../../item/models/item.model';
import { RelationService } from '../services/relation.service';

chai.should();
chai.use(chaiHttp);

const data = {
    name: 'test item',
    description: 'special test item only for test purpose',
    typeOfItem: TypeOfItem.text,
    owner: '5e4031339031c01452239999'
};
let app: Application;

describe('Relation', async () => {
    before(async () => {
        app = (await getApp()).application;
    });
    beforeEach(async () => {
        await cleanup();
    });
    describe('create', async () => {
        it('should create relation', async () => {
            const who = '5e550576414ab116c0014273';
            const from = await itemFabric('from');
            const to = await itemFabric('to');
            const what = await itemFabric('what');
            const AM = '5e550576414ab116c0014273';
            const relation = {
                from: from.id,
                to: to.id,
                what: what.id,
                rate: 1.0,
                authMarkers: [AM]
            };
            const justCreated = await RelationService.create(who, relation);
            justCreated!.id.should.be.a('string');
        });
    });
});

async function itemFabric(name?: string): Promise<IItemDocument> {
    const copiedData = Object.assign({}, data);
    if (name) {
        copiedData.name = name;
    }
    return Item.create(data);
}

async function cleanup() {
    return Item.remove({ owner: '5e4031339031c01452239999' });
}
