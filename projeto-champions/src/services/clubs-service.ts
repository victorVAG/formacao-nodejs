import * as HttpResponse from "../utils/http-helper";
import * as repository from "../repositories/clubs-repository";

export const getClubService = async () => {
  const data = await repository.findAllClubs();
  const response = HttpResponse.ok(data);
  return response;
};

export const getClubsByIdService = async (id: number) => {
  const data = await repository.findOneClub(id)
  const response = HttpResponse.ok(data);
  
  return response;
}
