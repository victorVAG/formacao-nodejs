import { IncomingMessage, ServerResponse } from "http";
import {serviceCategorieFilter} from "../services/categorie-filter-episodes-service"
import { serviceListEpisodes } from "../services/list-episodes-service";
import { serviceFilterEpisodes } from "../services/filter-episodes-service";
import { serviceError404 } from "../services/error404-service";
import { ContentType } from "../utils/content-type";
import { PodcastTransferModel } from "../models/podcast-transfer-model";

const defaultContent = { "Content-Type": ContentType.JSON };

export const getListEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const content: PodcastTransferModel = await serviceListEpisodes();

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};

export const getFilterEpisodes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const content: PodcastTransferModel = await serviceFilterEpisodes(req.url);

  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};



export const getFilterEpisodesbyCategories = async (
  req: IncomingMessage,
  res: ServerResponse
)=>{
   
  const content: PodcastTransferModel = await serviceCategorieFilter(req.url);
  
  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
};
export const error404 = async(
  req: IncomingMessage,
  res: ServerResponse
)=>{
  const content: PodcastTransferModel = await serviceError404();
  res.writeHead(content.statusCode, defaultContent);
  res.write(JSON.stringify(content.body));

  res.end();
}
