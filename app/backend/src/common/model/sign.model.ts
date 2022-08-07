import { JsonProperty, JsonObject } from 'json2typescript';
import { Constants } from "../utils/constants";

@JsonObject('Sign')
export class Sign {
  @JsonProperty('id', String)
  private _id = Constants.EMPTY_STRING;

  @JsonProperty('name', String)
  private _name = Constants.EMPTY_STRING;

  public get id() {
    return this._id;
  }

  public set id(value) {
    this._id = value;
  }

  public get name() {
    return this._name;
  }

  public set name(value) {
    this._name = value;
  }
}
