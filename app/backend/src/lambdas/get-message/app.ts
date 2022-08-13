import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Http } from "./common/utils/http";
import { Constants } from "./common/utils/constants";
import { DependenciesFactory } from "./dependencies-factory";
import { GetMessageHandler } from "./handler";

const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const {
    queryStringParameters: parameters,
  } = event;

  const birthday = parameters ? parameters['birthday'] : Constants.EMPTY_STRING;
 
  const dependenciesFactory = new DependenciesFactory();
  const getMessageHandler = new GetMessageHandler(dependenciesFactory);

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const messageResponse = await getMessageHandler.getMessage(birthday);
    const response = Http.buildResponse(JSON.stringify(messageResponse));
    return callback(null, response);

  } catch (error) {
    const errorResponse = Http.buildErrorResponse(error);
    return callback(null, errorResponse);
  }
};

export { handler };
