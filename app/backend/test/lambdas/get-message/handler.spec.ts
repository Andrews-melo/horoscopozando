import { GetMessageHandler } from './../../../src/lambdas/get-message/handler';
import { DependenciesFactoryInterface } from 'app/backend/src/lambdas/get-message/dependencies-factory';
import { expect } from 'chai';
import { HandlerStub } from './stub/handler.stub';

describe('Get message', () => {
  it('with data message', async () => {
    // Prepare
    const stub = new HandlerStub(HandlerStub.SCENARIO_WITH_DATA);
    const dependenciesFactory: DependenciesFactoryInterface = stub.getDependeciesFactoryStub();
    const getMessageHandler = new GetMessageHandler(dependenciesFactory);
    // Execute
    const dataItem = await getMessageHandler.getMessage('hz-2', 'hz-1');
    console.log(dataItem);
    const message = dataItem ? dataItem['message'] : null;
    // Validate
    expect(message).to.be.equal('message teste');
  });
});
