import { AWSError } from 'aws-sdk/lib/error';
import { PromiseResult } from 'aws-sdk/lib/request';
import AWS, { DynamoDB } from 'aws-sdk';

export interface DbClientInterface {
  put(params: DynamoDB.PutItemInput);
  update(params: DynamoDB.UpdateItemInput);
  query(params: DynamoDB.QueryInput): Promise<PromiseResult<DynamoDB.QueryOutput, AWSError>>;
  batchWrite(params: DynamoDB.BatchWriteItemInput);
  transactWriteItems(params: DynamoDB.TransactWriteItemsInput);
  delete(params: DynamoDB.Delete);
}

export class DbClient implements DbClientInterface {
  private readonly documentClient: AWS.DynamoDB;

  constructor() {
    this.documentClient = new AWS.DynamoDB();
  }

  public async put(params: DynamoDB.PutItemInput) {
    await this.documentClient.putItem(params).promise();
  }

  public async update(params: DynamoDB.UpdateItemInput) {
    await this.documentClient.updateItem(params).promise();
  }

  public query(params: DynamoDB.QueryInput): Promise<PromiseResult<DynamoDB.QueryOutput, AWSError>> {
    return this.documentClient.query(params).promise();
  }

  public async batchWrite(params: DynamoDB.BatchWriteItemInput) {
    await this.documentClient.batchWriteItem(params).promise();
  }

  public async transactWriteItems(params: DynamoDB.TransactWriteItemsInput) {
    await this.documentClient.transactWriteItems(params).promise();
  }

  public async delete(params: DynamoDB.Delete) {
    await this.documentClient.deleteItem(params).promise();
  }
}
