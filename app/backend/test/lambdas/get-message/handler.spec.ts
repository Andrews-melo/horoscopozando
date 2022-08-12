import { UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';

import { Horoscopozando } from './../../../src/common/model/horoscopozando.model';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { expect } from 'chai';
import { Environment } from './../../../src/common/utils/environment';
import { GetMessageHandler } from './../../../src/lambdas/get-message/handler';
import { DependenciesFactoryInterface } from './../../../src/lambdas/get-message/dependencies-factory';
import { HandlerStub } from './stub/handler.stub';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';

const mock = mockClient(DynamoDBClient);
describe('Get message', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should get message from the DynamoDB', async () => {
    /* const stub = new HandlerStub(HandlerStub.SCENARIO_PAGE_SIZE);
    const dependenciesFactory: DependenciesFactoryInterface = stub.getDependeciesFactoryStub();
    const getServiceOrdersHandler = new SAWGetSawsHandler(dependenciesFactory); */

    mock
      .on(QueryCommand, {
        TableName: Environment.tableName,
        ExpressionAttributeValues: {
          ':id': { S: 'hz-5' },
        },
      })
      .resolves({
        Items: [marshall({ id: 'hz-5', message: 'teste5', sign: 'abc' })],
      });

    mock
      .on(QueryCommand, {
        TableName: Environment.tableName,
        ExpressionAttributeValues: {
          ':id': { S: 'hz-2' },
        },
      })
      .resolves({
        Items: [marshall({ id: 'hz-2', message: 'teste4', sign: 'abc' })],
      });

    const dynamodb = new DynamoDBClient(mock);

    const query = await dynamodb.send(
      new QueryCommand({
        TableName: Environment.tableName,
        KeyConditionExpression: 'id = :id AND idSign = :idSign',
        ExpressionAttributeValues: {
          ':id': { S: 'hz-5' },
          ':idSign': { S: 'hz-3' },
        },
        ProjectionExpression: 'id, message',
      })
    );
    const dataMapped = query?.Items?.map((i) => unmarshall(i));
    const hzObj = Horoscopozando.fromJsonObject(
      dataMapped?.[0] || {}
    ) as Horoscopozando;

    expect(hzObj?.message).to.be.deep.equals('teste5');
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
