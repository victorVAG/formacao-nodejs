import { ClubModel } from "../models/club-model";
import fs from "fs/promises";

const database = [
  {
    id: 1,
    name: "Real Madrid",
  },
];

export const findAllClubs = async (): Promise<ClubModel[]> => {
  const data = await fs.readFile("./src/data/clubs.json", "utf-8");
  const clubs: ClubModel[] = JSON.parse(data);
  return clubs;
};
export const findOneClub= async (id:number): Promise<ClubModel | undefined>  =>{

  const data = await fs.readFile("./src/data/clubs.json", "utf-8");
  const clubs:ClubModel[] = JSON.parse(data);
  const club:ClubModel | undefined = clubs.find((club) => club.id == id)
  return club;
}
