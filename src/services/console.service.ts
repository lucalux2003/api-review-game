import { Console } from "../models/console.model";
import { notFound } from "../error/NotFoundError";
import { preconditionFailed } from "../error/PreconditionFailed";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if(console){
      return console;
    }
    return notFound("Console id " + id);
  }

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {
    const console = await Console.findByPk(id);
    if (console) {
      const games = await Game.findAll({ where: { console_id: id } });
      for (const game of games) {
        const reviews = await Review.findAll({ where: { game_id: game.id } });
        if (reviews.length > 0) {
          preconditionFailed("Reviews");
        }
      }
      await console.destroy();
    } else {
      notFound(id.toString());
    }
  }

  // Met à jour une console
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);
    if (console) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    return notFound("Console id " + id);
  }
}

export const consoleService = new ConsoleService();
