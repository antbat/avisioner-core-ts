import chai = require('chai');
import chaiHttp = require('chai-http');
import {Application} from 'express';
import 'mocha';
import {getApp} from '../../../app';
import {IItemDocument, TypeOfItem} from '../models/item.interface';
import {Item} from '../models/item.model';
import {ItemService} from '../services/Item.service';

chai.should();
chai.use(chaiHttp);

const data = {
    name: 'test item',
    description: 'special test item only for test purpose',
    typeOfItem: TypeOfItem.text,
    owner: '5e4031339031c01452239999',
};
let app: Application;

describe('Item', async () => {
    before(async () => {
        app = (await getApp()).application;
    });
    beforeEach( async () => {
        await cleanup();
    });
    describe('update', async () => {
        it('should update with history trail', async () => {
            const nextName = 'next test item';
            const item = await itemFabric();
            item.name = nextName;
            const id = item.id;
            await ItemService.update(item);

            const updated = await Item.findById(id);
            updated!.name.should.be.eql(nextName);

            const history = await Item.find({previousVersionOf: id});
            history.length.should.be.eql(1);
            history[0].name.should.be.eql(data.name);
        });
    });
    describe('get bulk', async () => {
        it('should return items', async () => {
            const MAX = 10;
            const items = [];
            for (let i = 0; i < MAX; i++) {
                items.push(await itemFabric());
            }
            const ids = items.map( (e) => e.id.toString());
            const result = await ItemService.getBulkByIds(ids);

            result.length. should.be.eql(10);
        });
    });
});

async function itemFabric(): Promise<IItemDocument> {
    return Item.create(data);
}
async function cleanup() {
    return Item.remove({owner: '5e4031339031c01452239999'});
}
