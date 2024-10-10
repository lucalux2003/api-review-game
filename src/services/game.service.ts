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

  // Crée un nouveau jeu
  public async createGame(
    title: string,
    console_id: number
  ): Promise<Game> {
    const console = await Console.findByPk(console_id);
    if(console){
      return Game.create({title: title, console_id: console_id });
    }
    return notFound("Console id " + console_id);
  }

  // Met à jour un jeu
  public async updateGame(
    id: number,
    title?: string,
    console_id?: number
  ): Promise<Game | null> {
    const game = await Game.findByPk(id);
    if (game) {
      if (title) game.title = title;
      if (console_id) game.console_id = console_id;
      await game.save();
      return game;
    }
    return notFound("Console id " + id);
  }
}

export const gameService = new GameService();
