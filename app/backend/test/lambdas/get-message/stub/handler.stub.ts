import { HoroscopozandoInputFactory } from './../../../../src/lambdas/get-message/common/db/horoscopozando-input-factory';
import { DBClient } from './../../../../src/common/db/db-client';
import { HoroscopozandoDB, HoroscopozandoDBProviderInterface } from './../../../../src/lambdas/get-message/common/db/horoscopozando-db';
import { DependenciesFactory, DependenciesFactoryInterface } from './../../../../src/lambdas/get-message/dependencies-factory';
import horoscopozandoDBJson from './hz-database.json';
import sinon from 'sinon';

export class HandlerStub {
  public static readonly SCENARIO_WITH_DATA = 'with_data';
  private readonly scenario: string;
  private readonly horoscopozandoDB;

  public constructor(scenarioItem: string) {
    this.scenario = scenarioItem;
  }

  public getHoroscopozandoDB() {
    return this.horoscopozandoDB;
  }

  public getDependeciesFactoryStub(): DependenciesFactoryInterface {
    const dependenciesFactory = new DependenciesFactory();
    dependenciesFactory.getHoroscopozandoDB = sinon.stub().returns(this.getHoroscopozandoDBStub());

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
}
