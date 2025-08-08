import fs from "fs";
import path from "path";


import { PodcastModel } from "../models/podcast-model";
import { json } from "stream/consumers";


const pathData = path.join(__dirname, "../repositories/podcasts.json");
export  const category = async (
    podcastCategories?:string[]
): Promise<PodcastModel[]> =>{
    const language = "utf-8";
    const rawData = fs.readFileSync(pathData, language);
    
    let jsonFile = JSON.parse(rawData);
    
    if (podcastCategories && podcastCategories.length > 0) {
    jsonFile= jsonFile.filter(
        (podcast: PodcastModel) =>{
        return podcastCategories.some((category:string) => podcast.categories.includes(category))
        
        }
      );
    
     }
    return jsonFile;
}