import { Sign } from '../model/sign.model';
import { Environment } from "../utils/environment";
import { QueryInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';

export class HoroscopozandoInputFactory {
  private static readonly ID = 'id';
  private static readonly ID_SIGN = 'id_sign';
  private static readonly ID_CURRENT_MESSAGE = 'id_current_message';
  private static readonly SIGN = 'sign';
  private static readonly MESSAGE = 'message';

  public createGetMessageQueryInput(
    IdSign: string,
    IdCurrentMessage: string
  ): QueryInput {
    return {
      ExpressionAttributeNames: {
        '#partitionKey': HoroscopozandoInputFactory.ID,
        '#message': HoroscopozandoInputFactory.MESSAGE,
        '#sign': HoroscopozandoInputFactory.SIGN,
        '#id_current_message': HoroscopozandoInputFactory.ID_CURRENT_MESSAGE
      },
      ExpressionAttributeValues: {
        ':id_sign': { S: IdSign },
        ':id_current_message': { S: IdCurrentMessage }
      },
      KeyConditionExpression: '#partitionKey = :id_sign AND #id_current_message = :IdCurrentMessage',
      FilterExpression: 'attribute_exists(#message)',
      TableName: Environment.tableName
    };
  }

  public createUpdateSignItemInput(
    sign: Sign
  ): UpdateItemInput {
    return {
      ExpressionAttributeNames: {
        '#sign': HoroscopozandoInputFactory.SIGN,
      },
      ExpressionAttributeValues: {
        ':sign': { S: sign.name }
      },
      TableName: Environment.tableName,
      Key: { id: { S: sign.id } }
    };
  }

  public createUpdateMessageItemInput(
    id: string,
    message: string
  ): UpdateItemInput {
    return {
      ExpressionAttributeNames: {
        '#partitionKey': HoroscopozandoInputFactory.ID,
        '#message': HoroscopozandoInputFactory.MESSAGE,
      },
      ExpressionAttributeValues: {
        ':message': { S: message }
      },
      TableName: Environment.tableName,
      Key: { id: { S: id } }
    };
  }

  public createUpdateCurrentMessageItemInput(
    idSign: string,
    idMessage: string
  ): UpdateItemInput {
    return {
      ExpressionAttributeNames: {
        '#partitionKey': HoroscopozandoInputFactory.ID,
        '#id_sign': HoroscopozandoInputFactory.ID_SIGN,
        '#id_current_message': HoroscopozandoInputFactory.ID_CURRENT_MESSAGE,
      },
      ExpressionAttributeValues: {
        ':id_sign': { S: idSign },
        ':id_current_message': { S: idMessage }
      },
      TableName: Environment.tableName,
      Key: { id: { S: idMessage } }
    };
  }
}