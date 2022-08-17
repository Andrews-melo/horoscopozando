import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { expect } from 'chai';
import { Environment } from './../../../src/common/utils/environment';
import { GetMessageHandler } from './../../../src/lambdas/get-message/handler';
import { DependenciesFactoryInterface } from './../../../src/lambdas/get-message/dependencies-factory';
import { HandlerStub } from './stub/handler.stub';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const mock = mockClient(DynamoDBClient);
describe('Get message', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should get sign', async () => {
    const stub = new HandlerStub(HandlerStub.SCENARIO_WITH_DATA);
    const dependenciesFactory: DependenciesFactoryInterface = stub.getDependeciesFactoryStub();
    const getSignInstance = new GetMessageHandler(dependenciesFactory);
    
    const sign = getSignInstance.getSign('1991-09-20');
  
    expect(sign?.name).to.be.deep.equals('Escorpião');
  });

  it('should update date', async () => {
    mock
      .on(UpdateCommand, {
        TableName: Environment.tableName,
        Key: {
          id: 'hz-5',
        },
        ExpressionAttributeValues: {
          ':currentDate': '11-11-1111',
        },
      })
      .resolves({});

    const dynamodb = new DynamoDBClient(mock);
   

    const query = await dynamodb.send(
      new UpdateCommand({
        TableName: Environment.tableName,
        Key: {
          id: 'hz-5',
        },
        ExpressionAttributeValues: {
          ':currentDate': '11-11-1111',
        },
      })
    );

    expect(query).to.be.deep.equals({});
  });
});
