import { DBClient } from './common/db/db-client';
import { HoroscopozandoDB } from './common/db/horoscopozando-db';
import { HoroscopozandoDBProviderInterface } from './common/db/horoscopozando-db';
import { HoroscopozandoInputFactory } from './common/db/horoscopozando-input-factory';
import { SignDictionary, SignDictionaryInterface } from './common/utils/signs.dictionary';

export interface DependenciesFactoryInterface {
  getHoroscopozandoDB(): HoroscopozandoDBProviderInterface;
  getSignDictionaryInstance(): SignDictionaryInterface;
}

export class DependenciesFactory implements DependenciesFactoryInterface {
  public horoscopozandoDB: HoroscopozandoDBProviderInterface;
  public signDictionaryInstance: SignDictionaryInterface;

  getHoroscopozandoDB(): HoroscopozandoDBProviderInterface {
    if (!this.horoscopozandoDB) {
      const dbClient: DBClient = new DBClient();
      const horoscopozandoDBInputFactory: HoroscopozandoInputFactory =
        new HoroscopozandoInputFactory();

      this.horoscopozandoDB = new HoroscopozandoDB(
        dbClient,
        horoscopozandoDBInputFactory
      );
    }

    return this.horoscopozandoDB;
  }

  getSignDictionaryInstance(): SignDictionaryInterface {
    if (!this.signDictionaryInstance) {
      this.signDictionaryInstance = new SignDictionary();
    }

    return this.signDictionaryInstance;
  }
}
