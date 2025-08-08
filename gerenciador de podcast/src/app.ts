import * as http from "http";

import {
  getListEpisodes,
  getFilterEpisodes,
  getFilterEpisodesbyCategories,
  error404
} from "./controllers/podcast-controller";

import { Routes } from "./routes/routes";
import { HttpMethod } from "./utils/http-methods";

export const app = async (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  const baseUrl = request.url?.split("?")[0];
  if (request.method === HttpMethod.GET && baseUrl === Routes.LIST) {
    await getListEpisodes(request, response);
  }else if (request.method === HttpMethod.GET && baseUrl === Routes.ESPISODE) {
    await getFilterEpisodes(request, response);
  }else if (request.method === HttpMethod.GET && baseUrl == Routes.CATEGORIE){
    
    await getFilterEpisodesbyCategories(request,response);
  }else{
    await error404(request,response);
  }
};
