
import { PuzzleGameModal } from './PuzzleGameModal.js';
import { PuzzleGame } from './PuzzleGame.js';
import { PuzzleCompletedModal } from './PuzzleCompletedModal.js';

class PuzzleApp {
    private puzzleGameModal: PuzzleGameModal | null = null;
    private puzzleGame: PuzzleGame | null = null;
    private puzzleCompletedModal: PuzzleCompletedModal | null = null;

    private onloadCompleted: (puzzleContainer: HTMLElement, url: string) => void = () => {};

    constructor() {
        this.onloadCompleted = (puzzleContainer, url) => {
            this.puzzleGame = new PuzzleGame(puzzleContainer, url, 600, 3);
            this.puzzleGame.onFinished = () => {
                this.puzzleCompletedModal = new PuzzleCompletedModal();
                this.puzzleCompletedModal?.Start();                
            }
        };
        this.puzzleGameModal = new PuzzleGameModal();
        const startBtn = document.getElementById('start-game-btn') as HTMLButtonElement;
        startBtn.addEventListener('click', () => {
            this.puzzleGameModal?.Start(this.onloadCompleted);
        });
    }
}

export { PuzzleApp };