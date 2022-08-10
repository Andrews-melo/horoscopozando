import { Sign } from '../model/sign.model';
import { Environment } from "../utils/environment";
import { QueryInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb';

export class HoroscopozandoInputFactory {
  private static readonly ID = 'id';
  private static readonly ID_SIGN = 'id_sign';
  private static readonly SIGN = 'sign';
  private static readonly MESSAGE = 'message';

  public createGetMessageQueryInput(
    IdSign: string,
    id: string
  ): QueryInput {
    return {
      ExpressionAttributeNames: {
        '#partitionKey': HoroscopozandoInputFactory.ID,
        '#message': HoroscopozandoInputFactory.MESSAGE,
        '#sign': HoroscopozandoInputFactory.SIGN,
        '#id_sign': HoroscopozandoInputFactory.ID_SIGN
      },
      ExpressionAttributeValues: {
        ':id_sign': { S: IdSign },
        ':id': { S: id }
      },
      KeyConditionExpression: '#partitionKey = :id',
      TableName: Environment.tableName
    };
  }
 /*  AND #id_sign = :id_sign */
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
    id: string
  ): UpdateItemInput {
    return {
      ExpressionAttributeNames: {
        '#partitionKey': HoroscopozandoInputFactory.ID,
        '#id_sign': HoroscopozandoInputFactory.ID_SIGN
      },
      ExpressionAttributeValues: {
        ':id_sign': { S: idSign }
      },
      TableName: Environment.tableName,
      Key: { id: { S: id } }
    };
  }
}