import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id?: number;
    rating: number;
    text_review: string;
    game_id: number;
    game?: GameDTO;
}