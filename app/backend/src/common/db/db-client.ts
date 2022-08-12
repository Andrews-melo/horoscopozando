import { Environment } from './../utils/environment';
import {
  DeleteCommand,
  DeleteCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export interface DBClientInterface {
  put(params: PutCommandInput);
  update(params: UpdateCommandInput);
  query(params: QueryCommandInput): Promise<QueryCommandOutput>;
  delete(params: DeleteCommandInput);
}

export class DBClient implements DBClientInterface {
  private readonly documentClient: DynamoDBClient;

  constructor() {
    this.documentClient = new DynamoDBClient({ region: Environment.region });
  }

  public async put(params: PutCommandInput) {
    await this.documentClient.send(new PutCommand(params));
  }

  public async update(params: UpdateCommandInput) {
    await this.documentClient.send(new UpdateCommand(params));
  }

  public async query(params: QueryCommandInput): Promise<QueryCommandOutput> {
    return this.documentClient.send(new QueryCommand(params));
  }

  public async delete(params: DeleteCommandInput) {
    await this.documentClient.send(new DeleteCommand(params));
  }
}
