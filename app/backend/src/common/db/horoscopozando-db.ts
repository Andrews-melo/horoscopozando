import { HoroscopozandoInputFactory } from './horoscopozando-input-factory';
import { Horoscopozando } from "../model/horoscopozando.model";
import { DBClientInterface } from "./db-client";

export interface HoroscopozandoDBProviderInterface {
  getMessage(idSign: string, id: string): Promise<Horoscopozando | null>;
}
export class HoroscopozandoDB implements HoroscopozandoDBProviderInterface {

  constructor(
    private readonly dbClient: DBClientInterface,
    private readonly horoscopozandoDBInputFactory: HoroscopozandoInputFactory
  ) { }

  public async getMessage(idSign: string, id: string): Promise<Horoscopozando | null> {    
    const params = this.horoscopozandoDBInputFactory.createGetMessageQueryInput(idSign, id);  
    const resp = await this.dbClient.query(params);
    if (resp) {      
      return Horoscopozando.fromJsonObject(resp) as Horoscopozando;
    }

    return null;
  }

}