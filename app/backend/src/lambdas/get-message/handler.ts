import { Horoscopozando } from './common/model/horoscopozando.model';
import { HoroscopozandoDBProviderInterface } from './common/db/horoscopozando-db';
import { DependenciesFactoryInterface } from './dependencies-factory';

export class GetMessageHandler {
  public horoscopozandoDB: HoroscopozandoDBProviderInterface;

  constructor(dependenciesFactory: DependenciesFactoryInterface) {
    this.horoscopozandoDB = dependenciesFactory.getHoroscopozandoDB();
  }

  public async getMessage(idSign: string, id: string): Promise<Horoscopozando | null> {
    return await this.horoscopozandoDB.getMessage(idSign, id);
  }

}