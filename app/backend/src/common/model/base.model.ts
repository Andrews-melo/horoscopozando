import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

export abstract class BaseModel {
  private static getJsonConvert(): JsonConvert {
    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.operationMode = OperationMode.ENABLE;
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;

    return jsonConvert;
  }

  public static fromJsonObjectClass(jsonObject: object, classReference: new () => {}): {} {
    const jsonConvert = BaseModel.getJsonConvert();
    return jsonConvert.deserializeObject(jsonObject, classReference);
  }

  public static fromJsonObjectClassArray(jsonObjectArray: object[], jsonClass: new () => {}): {}[] {
    const jsonConvert = BaseModel.getJsonConvert();
    const resultArray: {}[] = [];
    for (const jsonObject of jsonObjectArray) {
      resultArray.push(jsonConvert.deserialize(jsonObject, jsonClass));
    }

    return resultArray;
  }

  public static toJsonArray(jsonObjectArray: BaseModel[]): object[] {
    const jsonConvert = BaseModel.getJsonConvert();
    return jsonConvert.serialize(jsonObjectArray);
  }

  public toJsonObject(): object {
    const jsonConvert = BaseModel.getJsonConvert();
    return jsonConvert.serialize(this);
  }
}
