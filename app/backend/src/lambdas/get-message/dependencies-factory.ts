import { HoroscopozandoInputFactory } from './common/db/horoscopozando-input-factory';
import { DBClient } from './common/db/db-client';
import { HoroscopozandoDB } from './common/db/horoscopozando-db';
import { HoroscopozandoDBProviderInterface } from "./common/db/horoscopozando-db";

export interface DependenciesFactoryInterface {
  getHoroscopozandoDB(): HoroscopozandoDBProviderInterface;
}

export class DependenciesFactory implements DependenciesFactoryInterface {
  public horoscopozandoDB: HoroscopozandoDBProviderInterface;

  getHoroscopozandoDB(): HoroscopozandoDBProviderInterface {
    if (!this.horoscopozandoDB) {
      const dbClient: DBClient = new DBClient();
      const horoscopozandoDBInputFactory: HoroscopozandoInputFactory = new HoroscopozandoInputFactory();

      this.horoscopozandoDB = new HoroscopozandoDB(dbClient, horoscopozandoDBInputFactory);
    }

    return this.horoscopozandoDB;
  }
}