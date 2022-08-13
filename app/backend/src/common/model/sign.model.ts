import { JsonProperty, JsonObject } from 'json2typescript';
import { Constants } from '../utils/constants';
import { DateRangeSign } from './date-range-sign.model';
@JsonObject('Sign')
export class Sign {
  @JsonProperty('id', String)
  public id = Constants.EMPTY_STRING;

  @JsonProperty('name', String)
  public name = Constants.EMPTY_STRING;

  @JsonProperty('range_date', DateRangeSign)
  public dateRange = {} as DateRangeSign;
}
