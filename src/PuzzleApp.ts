
import { PuzzleGameHandler } from './PuzzleGameHandler.js';
import { ImageUploader } from './ImageUploader.js';

class PuzzleApp {
   private imageUploader: ImageUploader | null = null;
   private puzzleGameHandler: PuzzleGameHandler | null = null;

    constructor() {
        this.imageUploader = new ImageUploader();
        const startBtn = document.getElementById('start-game-btn') as HTMLButtonElement;
        startBtn.addEventListener('click', () => {
            this.Start();
        });
    }

    Start() :void {
        const url = this.imageUploader?.GetUrl();
        if (url) {
            this.puzzleGameHandler = new PuzzleGameHandler(url, 4, 4, 'puzzle-container');
            this.imageUploader?.HideImg();
            this.puzzleGameHandler.Start();
        } else {
            console.log("no picture");
        }
    }

    //make controls to start and reset
}

export { PuzzleApp };