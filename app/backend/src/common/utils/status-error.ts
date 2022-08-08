
export class StatusError extends Error {

  // Internal errors
  public static readonly USER_HAS_NO_PERMISSION = 901;
  public static readonly NOT_FOUND = 902;
  public static readonly AUTHENTICATION_REQUIRED = 903;
  public static readonly BAD_REQUEST = 904;
  public static readonly DB_OPERATION_FAILED = 905;
  public static readonly SAW_ALREADY_ASSIGNED = 906;
  public static readonly REPOSITORY_OPERATION_FAILED = 907;
  public static readonly FILE_ALREADY_EXISTS = 908;
  public static readonly IPAAS_SERVICE_FAILED = 909;
  public static readonly GSPN_ATTACHMENT_ALREADY_USED = 910;
  public static readonly GSPN_ATTACHMENT_NOT_EXISTS = 911;

  // Client errors or warnings
  public static readonly INVALID_SERVICE_ORDER = 1001;
  public static readonly INVALID_ORIGIN = 1002;
  public static readonly ORIGIN_NOT_INFORMED = 1003;

  constructor(public code: number, public msg?: string, public sts?: number) {
    super(
      JSON.stringify({
        errorCode: code,
        message: msg,
        status: sts,
      }),
    );
  }
}
