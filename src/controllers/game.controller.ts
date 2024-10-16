import { Body, Controller, Get, Post, Patch, Route, Tags, Path, Delete } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { ReviewDTO } from "../dto/review.dto";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }

  @Get("{id}/reviews")
  public async getReviewsByGameId(@Path() id: number): Promise<ReviewDTO[]> {
    return gameService.getReviewsByGameId(id);
  }

  // Crée un nouveau jeu
  @Post("/")
  public async createGame(
    @Body() requestBody: GameDTO
  ): Promise<GameDTO> {
    const { title, console_id } = requestBody;
    return gameService.createGame(title, console_id);
  }

  // Met à jour un jeu par ID
  @Patch("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() requestBody: GameDTO
  ): Promise<GameDTO | null> {
    const { title, console_id } = requestBody;
    return gameService.updateGame(id, title, console_id);
  }

    // Supprime un jeu par ID
    @Delete("{id}")
    public async deleteConsole(@Path() id: number): Promise<void> {
      await gameService.deleteGame(id);
    }
}