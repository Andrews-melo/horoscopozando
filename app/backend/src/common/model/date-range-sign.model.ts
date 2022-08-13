import { JsonProperty } from "json2typescript";
import { Constants } from "../utils/constants";

export class DateRangeSign {
  @JsonProperty('start_date', String)
  public startDate = Constants.EMPTY_STRING;

  @JsonProperty('end_date', String)
  public endDate = Constants.EMPTY_STRING;
}
