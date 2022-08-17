import { SignDictionary, SignDictionaryInterface } from './../../../../src/common/utils/signs.dictionary';
import { HoroscopozandoInputFactory } from './../../../../src/common/db/horoscopozando-input-factory';
import { DBClient } from './../../../../src/common/db/db-client';
import { HoroscopozandoDB, HoroscopozandoDBProviderInterface } from './../../../../src/common/db/horoscopozando-db';
import { DependenciesFactory, DependenciesFactoryInterface } from './../../../../src/lambdas/get-message/dependencies-factory';
import horoscopozandoDBJson from './hz-database.json';
import sinon from 'sinon';

export class HandlerStub {
  public static readonly SCENARIO_WITH_DATA = 'with_data';
  private readonly scenario: string;
  private readonly horoscopozandoDB;
  private readonly signDictionaryInstance: SignDictionaryInterface;

  public constructor(scenarioItem: string) {
    this.scenario = scenarioItem;
  }

  public getHoroscopozandoDB() {
    return this.horoscopozandoDB;
  }

  public getsignDictionaryInstance() {
    return this.signDictionaryInstance;
  }


  public getDependeciesFactoryStub(): DependenciesFactoryInterface {
    const dependenciesFactory = new DependenciesFactory();
    dependenciesFactory.getHoroscopozandoDB = sinon.stub().returns(this.getHoroscopozandoDBStub());
    dependenciesFactory.getSignDictionaryInstance = sinon.stub().returns(this.getDictionaryInstanceStub());

    return dependenciesFactory;
  }

  private getHoroscopozandoDBStub(): HoroscopozandoDBProviderInterface {
    const dbClient: DBClient = new DBClient();
    const horoscopozandoInputFactory: HoroscopozandoInputFactory = new HoroscopozandoInputFactory();
    const horoscopozandoDB = new HoroscopozandoDB(dbClient, horoscopozandoInputFactory);

    const getMessageResult = horoscopozandoDBJson[this.scenario];

    horoscopozandoDB.getMessage = sinon.stub().returns(
      { items: getMessageResult });

    return horoscopozandoDB;
  }

  private getDictionaryInstanceStub(): SignDictionaryInterface {
    return new SignDictionary();;
  }
}
