import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";
import { preconditionFailed } from "../error/PreconditionFailed";
import { Review } from "../models/review.model";


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

  public async getReviewsByGameId(id: number): Promise<Review[]>{
    const game = await Game.findByPk(id);
    if(console){
      return Review.findAll({where : {game_id : id }});
    }
    return notFound("Console id " + id);
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
    return notFound("Console id " + console_id); // if the console doesn't exist
  }

  // Supprime une console par ID
  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);
    if (game) {
      const reviews = await Review.findAll({ where: { game_id: id } });
        if (reviews.length > 0) {
          preconditionFailed("Reviews");
        }
      await game.destroy();
    } else {
      notFound(id.toString());
    }
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
