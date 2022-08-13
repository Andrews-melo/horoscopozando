import { Sign } from '../model/sign.model';

export interface SignDictionaryInterface {
  getSign(birthday: string): Sign | undefined;
}
export class SignDictionary implements SignDictionaryInterface {
  private readonly ARIES = 'Áries';
  private readonly TAURUS = 'Touro';
  private readonly GEMINI = 'Gêmeos';
  private readonly CANCER = 'Câncer';
  private readonly LEO = 'Leão';
  private readonly VIRGO = 'Virgem';
  private readonly LIBRA = 'Libra';
  private readonly SCORPIO = 'Escorpião';
  private readonly SAGITTARIUS = 'Sagitário';
  private readonly CAPRICORN = 'Capricórnio';
  private readonly AQUARIUS = 'Aquário';
  private readonly PISCES = 'Peixes';

  private signs: Sign[] = [
    {
      id: 's-1',
      name: this.ARIES,
      dateRange: this.getTimeSign('03-21', '04-20'),
    },
    {
      id: 's-2',
      name: this.TAURUS,
      dateRange: this.getTimeSign('04-21', '05-20'),
    },
    {
      id: 's-3',
      name: this.GEMINI,
      dateRange: this.getTimeSign('05-21', '06-20'),
    },
    {
      id: 's-4',
      name: this.CANCER,
      dateRange: this.getTimeSign('06-21', '07-22'),
    },
    {
      id: 's-5',
      name: this.LEO,
      dateRange: this.getTimeSign('07-23', '08-22'),
    },
    {
      id: 's-6',
      name: this.VIRGO,
      dateRange: this.getTimeSign('08-23', '09-22'),
    },
    {
      id: 's-7',
      name: this.LIBRA,
      dateRange: this.getTimeSign('09-23', '10-22'),
    },
    {
      id: 's-8',
      name: this.SCORPIO,
      dateRange: this.getTimeSign('10-23', '11-21'),
    },
    {
      id: 's-9',
      name: this.SAGITTARIUS,
      dateRange: this.getTimeSign('11-22', '12-21'),
    },
    {
      id: 's-10',
      name: this.CAPRICORN,
      dateRange: this.getTimeSign('12-22', '01-20'),
    },
    {
      id: 's-11',
      name: this.AQUARIUS,
      dateRange: this.getTimeSign('01-21', '02-18'),
    },
    {
      id: 's-12',
      name: this.PISCES,
      dateRange: this.getTimeSign('02-19', '03-20'),
    },
  ];

  private getTimeSign(sDate: string, eDate: string): { startDate; endDate } {
    return {
      startDate: new Date(sDate).getTime(),
      endDate: new Date(eDate).getTime(),
    };
  }
  public getSign(birthday: string): Sign | undefined {
    if (birthday && this.signs) {
      return this.signs.find(
        (value: Sign) =>
          birthday >= value.dateRange.startDate &&
          birthday <= value.dateRange.endDate
      );
    }
    return undefined;
  }
}
