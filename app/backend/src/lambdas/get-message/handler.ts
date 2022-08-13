import { DependenciesFactoryInterface } from './dependencies-factory';
import { Horoscopozando } from './common/model/horoscopozando.model';
import { HoroscopozandoDBProviderInterface } from './common/db/horoscopozando-db';
import { Sign } from './common/model/sign.model';
import { SignDictionaryInterface } from './common/utils/signs.dictionary';

export class GetMessageHandler {
  public horoscopozandoDB: HoroscopozandoDBProviderInterface;
  public signDictionaryInstance: SignDictionaryInterface;

  constructor(dependenciesFactory: DependenciesFactoryInterface) {
    this.horoscopozandoDB = dependenciesFactory.getHoroscopozandoDB();
    this.signDictionaryInstance = dependenciesFactory.getSignDictionaryInstance();
  }

  public async getMessage(birthday: string): Promise<Horoscopozando | null> {
    const sign: Sign | undefined = this.getSign(birthday);
    if (sign) {
      const { id } = sign;
      return await this.horoscopozandoDB.getMessage(id);
    }
    return null;
  }

  public getSign(birthday: string): Sign | undefined {
    return this.signDictionaryInstance.getSign(birthday);
  }
}
