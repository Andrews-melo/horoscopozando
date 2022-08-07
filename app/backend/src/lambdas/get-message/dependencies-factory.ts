import { HoroscopozandoDB } from './../../common/db/horoscopozando-db';
import { HoroscopozandoDBProviderInterface } from "./common/db/horoscopozando-db";

export interface DependenciesFactoryInterface {
  getHoroscopozandoDB(): HoroscopozandoDBProviderInterface;
}

export class DependenciesFactory implements DependenciesFactoryInterface {
  public horoscopozandoDB: HoroscopozandoDBProviderInterface;
 
  getHoroscopozandoDB(): HoroscopozandoDBProviderInterface {
    if(!this.horoscopozandoDB) {
      this.horoscopozandoDB = new HoroscopozandoDB();
    }

    return this.horoscopozandoDB;
  }
}