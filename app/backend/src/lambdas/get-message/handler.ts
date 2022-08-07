import { HoroscopozandoDBProviderInterface } from './../../common/db/horoscopozando-db';
import { DependenciesFactoryInterface } from './dependencies-factory';

export class GetMessageHandler {
  public horoscopozandoDB: HoroscopozandoDBProviderInterface;

  constructor(dependenciesFactory: DependenciesFactoryInterface) {
    this.horoscopozandoDB = dependenciesFactory.getHoroscopozandoDB();
  }

  public putDataInDB(): void {
    try {


    } catch (e) {
      console.log("Error", e);
    }
  }

}