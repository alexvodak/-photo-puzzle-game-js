import { PuzzleGame } from './PuzzleGame.js';

class PuzzleGameHandler {
    private imageUrl: string;
    private rows: number;
    private cols: number;
    private containerId: string;

    private puzzleGame: PuzzleGame | null = null;

    constructor(imageUrl: string, rows: number, cols: number, containerId: string) {
        this.imageUrl = imageUrl;
        this.rows = rows;
        this.cols = cols;
        this.containerId = containerId;
    }

    Start():void {
        this.initPuzzle();
    }

    Cleanup():void {
        this.puzzleGame?.Cleanup();
        this.puzzleGame = null;
    }

    private initPuzzle():void {
        this.puzzleGame = new PuzzleGame(this.imageUrl, this.rows, this.cols, this.containerId);
    }
}

export { PuzzleGameHandler };