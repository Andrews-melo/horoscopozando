export interface HoroscopozandoDBProviderInterface {
  getMessage(id: string): Promise<void>;
}
export class HoroscopozandoDB implements HoroscopozandoDBProviderInterface {
  
  getMessage(id: string): Promise<void> {
    throw new Error("Method not implemented." + id);
  }

}