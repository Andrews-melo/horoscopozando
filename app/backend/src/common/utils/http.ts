import { Constants } from './constants';
import { StatusError } from './status-error';

interface ErrorResponse {
  statusCode: number,
  headers: {},
  body: string | undefined,
}

export class Http {
  public static readonly CONTENT_TYPE_HEADER: string = 'Content-Type';
  public static readonly COOKIE_HEADER: string = 'cookie';
  public static readonly JSON_CONTENT_TYPE = 'application/json';
  private static readonly AC_ALLOW_CREDENTIALS_HEADER: string = 'Access-Control-Allow-Credentials';
  private static readonly AC_ALLOW_ORIGIN_HEADER: string = 'Access-Control-Allow-Origin';
  private static readonly AC_EXPOSE_HEADERS_HEADER: string = 'Access-Control-Expose-Headers';
  private static readonly ALLOW_CREDENTIALS_HEADER_VALUE: string = 'true';
  private static readonly REFRESH_COOKIE_HEADER: string = 'refreshedCookie';
 
  public static buildResponse(result?: string, refreshedCookie?: string,
  ): object {

    const response = {
      statusCode: Constants.HTTP_STATUS_200,
      headers: {},
      body: result,
      isBase64Encoded: false,
    };

    response.headers[Http.CONTENT_TYPE_HEADER] = Http.JSON_CONTENT_TYPE;
    response.headers[Http.AC_ALLOW_CREDENTIALS_HEADER] = Http.ALLOW_CREDENTIALS_HEADER_VALUE;
    response.headers[Http.AC_ALLOW_ORIGIN_HEADER] = '*';
    response.headers[Http.AC_EXPOSE_HEADERS_HEADER] = Http.REFRESH_COOKIE_HEADER;
    response.headers[Http.REFRESH_COOKIE_HEADER] = refreshedCookie;

    if (!refreshedCookie) {
      delete response.headers[Http.REFRESH_COOKIE_HEADER];
    }

    return response;
  }

  public static buildErrorResponse(error: StatusError): object {
    const errorResponse: ErrorResponse = {
      statusCode: Constants.HTTP_STATUS_500,
      headers: {},
      body: undefined,
    };

    errorResponse.headers[Http.AC_ALLOW_CREDENTIALS_HEADER] = Http.ALLOW_CREDENTIALS_HEADER_VALUE;
    errorResponse.headers[Http.AC_ALLOW_ORIGIN_HEADER] = '*';

    Http.setStatusCode(errorResponse, error);

    return errorResponse;
  }

  

  private static setStatusCode(errorResponse: ErrorResponse, error: StatusError): void {
    const HTTP_STATUS_CODES = {};
    HTTP_STATUS_CODES[StatusError.INVALID_SERVICE_ORDER] = Constants.HTTP_STATUS_400;
    HTTP_STATUS_CODES[StatusError.BAD_REQUEST] = Constants.HTTP_STATUS_400;
    HTTP_STATUS_CODES[StatusError.AUTHENTICATION_REQUIRED] = Constants.HTTP_STATUS_401;
    HTTP_STATUS_CODES[StatusError.USER_HAS_NO_PERMISSION] = Constants.HTTP_STATUS_403;
    HTTP_STATUS_CODES[StatusError.NOT_FOUND] = Constants.HTTP_STATUS_404;
    HTTP_STATUS_CODES[StatusError.DB_OPERATION_FAILED] = Constants.HTTP_STATUS_500;
    HTTP_STATUS_CODES[StatusError.GSPN_ATTACHMENT_ALREADY_USED] = Constants.HTTP_STATUS_400;
    HTTP_STATUS_CODES[StatusError.GSPN_ATTACHMENT_NOT_EXISTS] = Constants.HTTP_STATUS_400;

    if (HTTP_STATUS_CODES[error.code]) {
      errorResponse.statusCode = HTTP_STATUS_CODES[error.code];
    }

    if (HTTP_STATUS_CODES[error.code] === Constants.HTTP_STATUS_400 ||
        HTTP_STATUS_CODES[error.code] === Constants.HTTP_STATUS_500) {
      errorResponse.body = error.message;
    }
  }
}
