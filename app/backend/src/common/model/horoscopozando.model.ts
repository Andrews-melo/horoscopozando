import { JsonObject, JsonProperty } from 'json2typescript';
import { Constants } from '../utils/constants';
import { BaseModel } from './base.model';

@JsonObject('Horoscopozando')
export class Horoscopozando extends BaseModel {
  @JsonProperty('id', String)
  private _id = Constants.EMPTY_STRING;

  @JsonProperty('message', String)
  private _message = Constants.EMPTY_STRING;

  @JsonProperty('sign', String)
  private _sign = Constants.EMPTY_STRING;

  public get id() {
    return this._id;
  }

  public set id(value) {
    this._id = value;
  }

  public get message() {
    return this._message;
  }

  public set message(value) {
    this._message = value;
  }

  public get sign() {
    return this._sign;
  }

  public set sign(value) {
    this._sign = value;
  }

  public static fromJsonObject(jsonObject: object) {
    return Horoscopozando.fromJsonObjectClass(jsonObject, Horoscopozando);
  }
}