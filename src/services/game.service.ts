import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";


export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }
  public async getGameById(id: number): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if(game){
      return game;
    }
    return notFound("Game id " + id);
  }
}

export const gameService = new GameService();
