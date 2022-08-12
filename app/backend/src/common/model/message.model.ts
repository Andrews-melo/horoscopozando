import { JsonObject, JsonProperty } from 'json2typescript';
import { Constants } from '../utils/constants';

@JsonObject('Message')
export class Message {
  @JsonProperty('id', String)
  public id = Constants.EMPTY_STRING;

  @JsonProperty('message', String)
  public message = Constants.EMPTY_STRING;

  @JsonProperty('idSign', String)
  public idSign = Constants.EMPTY_STRING;
}