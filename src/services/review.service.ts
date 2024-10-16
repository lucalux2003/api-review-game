import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";
import { Review } from "../models/review.model";
import { ReviewDTO } from "../dto/review.dto";
import { preconditionFailed } from "../error/PreconditionFailed";


export class ReviewService {
  public async getAllReviews(): Promise<ReviewDTO[]> {
    return Review.findAll({
      include: [
        {
          model: Game,
          as: "game",
          include:[
            {
                model: Console,
                as: "console",
              },
          ]
        },
      ],
    });
  }

  public async getReviewById(id: number): Promise<ReviewDTO | null> {
    const review = await Review.findByPk(id);
    if(review){
      return review;
    }
    return notFound("Game id " + id);
  }

  // Crée un nouveau jeu
  public async createReview(
    rating: number,
    review_text: string,
    game_id: number
  ): Promise<Review> {
    const game = await Game.findByPk(game_id);
    if(game){
      return Review.create({rating: rating, review_text: review_text, game_id: game_id }); //rating,review_text, game_id
    }
    return notFound("Game id " + game_id); // if the game doesn't exist
  }

  // Supprime une console par ID
  public async deleteReview(id: number): Promise<void> {
    const review = await Review.findByPk(id);
    if (review) {
      await review.destroy();
    } else {
      notFound(id.toString());
    }
  }

  // Met à jour un jeu
  public async updateReview(
    id: number,
    rating?: number,
    review_text?: string,
    game_id?: number
  ): Promise<Review | null> {
    const review = await Review.findByPk(id);
    const game = await Game.findByPk(game_id);
    if (review) {
      if(game){
        if (rating) review.rating = rating;
        if (game_id) review.game_id = game_id;
        await review.save();
        return review;
      }
      return notFound("Game id " + game_id);
    }
    return notFound("Review id " + id);
  }
}

export const reviewService = new ReviewService();
