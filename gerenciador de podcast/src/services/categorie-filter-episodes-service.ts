import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { category } from "../repositories/podcast-repository-category";
import { StatusCode } from "../utils/status-code";

export const serviceCategorieFilter = async(
    podcastCategories: string | undefined

): Promise<PodcastTransferModel> => {
    let response: PodcastTransferModel ={
        statusCode:0, 
        body:[],
    };
    const queryString = podcastCategories?.split("?c=")[1] || "";
    const pieces = queryString?.split(",") || "";

    const data = await category (pieces); 

    
    let responseFormat = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent, 
        body: data,

    };
    
    return responseFormat;
}