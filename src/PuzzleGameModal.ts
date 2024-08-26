import { Modal } from './Modal.js';
import { PuzzleGame } from './PuzzleGame.js';

class PuzzleGameModal {
    private modal: Modal | null = null;
    private url: string | null = null;
    private puzzleGame: PuzzleGame | null = null;

    Start():void {
        const content = `
            <input type="file" id="upload-image" accept="image/*">
        `;
        this.modal = new Modal('upload-modal', 'Upload image', content, () => {
            const fileInput = document.getElementById('upload-image') as HTMLInputElement;
            const file = fileInput.files ? fileInput.files[0] : null;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const puzzleContainer = document.getElementById('puzzle-container')!;
                    puzzleContainer.innerHTML = '';
                    this.url = e.target!.result as string;
                    let imgElement = document.createElement('img');
                    imgElement.id = 'uploaded-img';
                    imgElement.src = this.url;
                    imgElement.style.display = 'none';
                    puzzleContainer.appendChild(imgElement);
                    this.puzzleGame = new PuzzleGame(puzzleContainer, this.url, 600, 3);
                };
                reader.readAsDataURL(file);
                console.log("Image uploaded");
            }
        });

        this.modal.open();
    }


}

export { PuzzleGameModal };