import { JsonObject, JsonProperty } from 'json2typescript';
import { Constants } from '../utils/constants';

@JsonObject('Message')
export class Message {
  @JsonProperty('message', String)
  private _message = Constants.EMPTY_STRING;

  public get message() {
    return this._message;
  }

  public set message(value) {
    this._message = value;
  }
}