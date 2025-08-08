
import { PodcastTransferModel } from "../models/podcast-transfer-model";
import { repositoryPodcast } from "../repositories/podcast-repository";
import { StatusCode } from "../utils/status-code";


export const serviceFilterEpisodes = async(
    podcastName: string | undefined

): Promise<PodcastTransferModel> => {
    let response: PodcastTransferModel ={
        statusCode:0, 
        body:[],
    };
    
    const queryString = podcastName?.split("?p=")[1] || "";
    const data = await repositoryPodcast (queryString); 
    
    let responseFormat = {
        statusCode: data.length !== 0 ? StatusCode.OK : StatusCode.NoContent, 
        body: data,

    };

    return responseFormat;
}