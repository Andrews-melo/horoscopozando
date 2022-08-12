import { DBClientInterface } from './db-client';
import { Horoscopozando } from '../model/horoscopozando.model';
import { HoroscopozandoInputFactory } from './horoscopozando-input-factory';

export interface HoroscopozandoDBProviderInterface {
  getMessage(idSign: string, id: string): Promise<Horoscopozando | null>;
  updateCurrentDate(id: string, date: string): Promise<void>;
}
export class HoroscopozandoDB implements HoroscopozandoDBProviderInterface {
  constructor(
    private readonly dbClient: DBClientInterface,
    private readonly horoscopozandoDBInputFactory: HoroscopozandoInputFactory
  ) {}

  public async getMessage(
    idSign: string,
    id: string
  ): Promise<Horoscopozando | null> {
    const params = this.horoscopozandoDBInputFactory.createGetMessageQueryInput(
      idSign,
      id
    );
    const resp = await this.dbClient.query(params);
    if (resp) {
      return Horoscopozando.fromJsonObject(resp) as Horoscopozando;
    }

    return null;
  }

  public async updateCurrentDate(id: string, date: string): Promise<void> {
    const params =
      this.horoscopozandoDBInputFactory.createUpdateCurrentDateItemInput(
        id,
        date
      );
    return await this.dbClient.update(params);
  }
}
