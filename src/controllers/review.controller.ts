import { Body, Controller, Get, Post, Patch, Route, Tags, Path, Delete } from "tsoa";
import { Review } from "../models/review.model";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  @Get("/")
  public async getAllReviews(): Promise<ReviewDTO[]> {
    return reviewService.getAllReviews();
  }

  @Get("{id}")
  public async getReviewById(@Path() id: number): Promise<ReviewDTO | null> {
    return reviewService.getReviewById(id);
  }

  // Crée une nouvelle review
  @Post("/")
  public async createReview(
    @Body() requestBody: ReviewDTO
  ): Promise<ReviewDTO> {
    const { rating,review_text, game_id } = requestBody;
    return reviewService.createReview(rating,review_text, game_id);
  }

  // Met à jour une review par ID
  @Patch("{id}")
  public async updateReview(
    @Path() id: number,
    @Body() requestBody: ReviewDTO
  ): Promise<ReviewDTO | null> {
    const { rating,review_text, game_id } = requestBody;
    return reviewService.updateReview(id, rating,review_text, game_id);
  }

  // Supprime une review par ID
  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    await reviewService.deleteReview(id);
  }
}
