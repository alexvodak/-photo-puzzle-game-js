
import { PuzzleGameModal } from './PuzzleGameModal.js';

class PuzzleApp {
   private puzzleGameModal: PuzzleGameModal | null = null;

    constructor() {
        this.puzzleGameModal = new PuzzleGameModal();
        const startBtn = document.getElementById('start-game-btn') as HTMLButtonElement;
        startBtn.addEventListener('click', () => {
            this.puzzleGameModal?.Start();
        });
    }
}

export { PuzzleApp };