
import { PuzzleGameModal } from './PuzzleGameModal.js';
import { PuzzleGame } from './PuzzleGame.js';
import { PuzzleCompletedModal } from './PuzzleCompletedModal.js';

class PuzzleApp {
    private puzzleGameModal: PuzzleGameModal | null = null;
    private puzzleGame: PuzzleGame | null = null;
    private puzzleContainer: HTMLElement | null = null;
    private url: string | null = null;
    private size: number | null = null;

    private onloadCompleted: (puzzleContainer: HTMLElement, url: string, size: number) => void = () => {};

    constructor() {
        this.onloadCompleted = (puzzleContainer, url, size) => {
            this.puzzleContainer = puzzleContainer;
            this.url = url;
            this.size = size;
            this.initPuzzleGame();
        };
        this.puzzleGameModal = new PuzzleGameModal();
        this.initStartButton();
        this.initRestartButton();
    }

    private initRestartButton() {
        const restartBtn = this.getButton('restart-game-btn');
        restartBtn.addEventListener('click', () => {
            this.initPuzzleGame();
        });
    }

    private getButton(elementId: string) {
        return document.getElementById(elementId) as HTMLButtonElement;
    }

    private initStartButton() {
        const startBtn = this.getButton('start-game-btn');
        startBtn.addEventListener('click', () => {
            this.puzzleGameModal?.Start(this.onloadCompleted);
        });
    }

    private initPuzzleGame() : void {
        if (!this.puzzleContainer || !this.url || !this.size) {
            return;
        }
        this.puzzleContainer.innerHTML = '';
        this.puzzleGame = new PuzzleGame(this.puzzleContainer, this.url, 600, this.size);
        this.puzzleGame.onFinished = () => {
            const puzzleCompletedModal = new PuzzleCompletedModal();
            puzzleCompletedModal.Start();
        }
    }
}

export { PuzzleApp };