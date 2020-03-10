import chai = require('chai');
import chaiHttp = require('chai-http');
import { Application } from 'express';
import 'mocha';
import { getApp } from '../../../app';
import { IItemDocument, TypeOfItem } from '../models/item.interface';
import { Item } from '../models/item.model';
import { ItemService } from '../services/Item.service';

chai.should();
chai.use(chaiHttp);

const data = {
    name: 'test item',
    description: 'special test item only for test purpose',
    typeOfItem: TypeOfItem.text,
    owner: '5e4031339031c01452239999'
};
let app: Application;

describe('Item', async () => {
    before(async () => {
        app = (await getApp()).application;
    });
    beforeEach(async () => {
        await cleanup();
    });
    describe('update', async () => {
        it.only('should update with history trail', async () => {
            const nextName = 'next test item';
            const item = await itemFabric();
            item.name = nextName;
            const id = item.id;
            await ItemService.update(item);

            const updated = await Item.findById(id);
            updated!.name.should.be.eql(nextName);

            const history = await Item.find({ previousVersionOf: id });
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
            const ids = items.map(e => e.id.toString());
            const result = await ItemService.getBulkByIds(ids);

            result.length.should.be.eql(10);
        });
    });
    describe('get bulk by AMs', async () => {
        it.only('should return items', async () => {
            const MAX = 10;
            const am1 = '5e5bc75793bf670c56118609';
            const am2 = '5e5bc75793bf670c5611860d';
            const am3 = '5e5bc75793bf670c5611860c';
            for (let i = 0; i < MAX; i++) {
                let one = Object.assign(data);
                one.authMarkers = [am1];
                await itemFabric(one);

                one = Object.assign(data);
                one.authMarkers = [am1, am2];
                await itemFabric(one);

                one = Object.assign(data);
                one.authMarkers = [am3];
                await itemFabric(one);
            }
            const result = await ItemService.getItemsByAMs(data.owner, [am1, am2]);

            result.length.should.be.eql(20);
        });
    });
});
async function itemFabric(newestData: any = data): Promise<IItemDocument> {
    return Item.create(newestData);
}
async function cleanup() {
    return Item.remove({ owner: '5e4031339031c01452239999' });
}
