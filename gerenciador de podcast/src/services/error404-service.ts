import { PodcastTransferModel } from "../models/podcast-transfer-model";

import { StatusCode } from "../utils/status-code";
export const serviceError404 = async (): Promise <PodcastTransferModel> => {
    let responseFormat: PodcastTransferModel = {
        statusCode:  StatusCode.NotFound,
        body : [],
    };


    return responseFormat;
}