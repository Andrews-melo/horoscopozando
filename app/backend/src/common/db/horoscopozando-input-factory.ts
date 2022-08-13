import { Message } from './../model/message.model';
import { Sign } from '../model/sign.model';
import { Environment } from '../utils/environment';
import { UpdateCommandInput, PutCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';

export class HoroscopozandoInputFactory {
  private static readonly ID = 'id';
  private static readonly ID_SIGN = 'id_sign';
  private static readonly SIGN = 'sign';
  private static readonly MESSAGE = 'message';
  private static readonly CURRENT_DATE = 'current_date';

  public createGetMessageQueryInput(IdSign: string): QueryCommandInput {
    return {
      ExpressionAttributeNames: {
        '#partitionKey': HoroscopozandoInputFactory.ID,
        '#message': HoroscopozandoInputFactory.MESSAGE,
        '#sign': HoroscopozandoInputFactory.SIGN,
        '#id_sign': HoroscopozandoInputFactory.ID_SIGN,
        '#current_date': HoroscopozandoInputFactory.CURRENT_DATE
      },
      ExpressionAttributeValues: {
        ':idSign': { S: IdSign },
        ':currentDate': new Date()
      },
      KeyConditionExpression: '#id_sign = :idSign AND #current_date = :currentDate',
      TableName: Environment.tableName,
    };
  }

  public createUpdateSignItemInput(sign: Sign): UpdateCommandInput {
    return {
      ExpressionAttributeNames: {
        '#sign': HoroscopozandoInputFactory.SIGN,
      },
      ExpressionAttributeValues: {
        ':sign': { S: sign.name },
      },
      TableName: Environment.tableName,
      Key: { id: { S: sign.id } },
    };
  }

  public createPutSignItemInput(sign: Sign): PutCommandInput {
    return {
      TableName: Environment.tableName,
      Item: {
        id: sign.id,
        name: sign.name,
      },
    };
  }

  public createPutMessageItemInput(msg: Message): PutCommandInput {
    return {
      TableName: Environment.tableName,
      Item: {
        id: msg.id,
        message: msg.message,
        id_sign: msg.idSign,
      },
    };
  }

  public createUpdateCurrentDateItemInput(
    id: string,
    date: string
  ): UpdateCommandInput {
    return {
      Key: {
        id: id,
      },
      ExpressionAttributeNames: {
        '#cd': HoroscopozandoInputFactory.CURRENT_DATE,
      },
      UpdateExpression: 'set #cd = :currentDate',
      ExpressionAttributeValues: {
        ':currentDate': date,
      },
      TableName: Environment.tableName,
    };
  }
}
