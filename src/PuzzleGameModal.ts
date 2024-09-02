import { Modal } from './Modal.js';

export class PuzzleGameModal {
    private modal: Modal | null = null;
    private url: string | null = null;
    private size: number | null = null;

    Start(onloadCompleted: (puzzleContainer: HTMLElement, url: string, size: number) => void) : void {
        const content = `
            <div class="input-element">
                <label>Image</label>
                <input type="file" id="upload-image" accept="image/*" />
            </div>
            <div class="input-element">
                <label>Puzzle size</label>
                <input id="puzzle-size" type="number" name="puzzle-size" value="3" min="3" max="6" step="1" />
            </div>
        `;
        this.modal = new Modal('upload-modal', 'Upload image', content, 'Start', () => {
            const fileInput = document.getElementById('upload-image') as HTMLInputElement;
            const sizeInput = document.getElementById('puzzle-size') as HTMLInputElement;
            this.size = parseInt(sizeInput.value);
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
                    if (!this.size) {
                        this.size = 3;
                    }
                    onloadCompleted(puzzleContainer, this.url, this.size);
                    
                };
                reader.readAsDataURL(file);
            }
        });

        this.modal.open();
    }


}