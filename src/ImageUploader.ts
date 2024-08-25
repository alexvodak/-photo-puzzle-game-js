import { Modal } from './Modal.js';

class ImageUploader {
    private modal: Modal | null = null;
    private url: string | null = null;

    constructor() {
        this.initUploadPictureModal();
    }

    GetUrl():string | null {
        return this.url;
    }

    private initUploadPictureModal(): void {
        const uploadBtn = document.getElementById('upload-btn') as HTMLButtonElement;
        uploadBtn.addEventListener('click', () => {
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
                        const imgElement = document.createElement('img');
                        imgElement.id = 'uploaded-img';
                        imgElement.src = e.target!.result as string;
                        imgElement.style.display = 'block';
                        puzzleContainer.innerHTML = '';
                        puzzleContainer.appendChild(imgElement);
                        this.resizeImageToFitScreen(imgElement);
                        this.url = imgElement.src;
                    };
                    reader.readAsDataURL(file);
                }
                console.log("Image uploaded");
            });

            this.modal.open();
        });
    }

    private resizeImageToFitScreen(imgElement: HTMLImageElement): void {
        const winDim = this.getWinDim();
        imgElement.style.height = `${winDim.y}px`;
        if (imgElement.offsetWidth > winDim.x) {
            imgElement.style.width = `${winDim.x}px`;
        }
    }

    private getWinDim(): { x: number, y: number } {
        const body = document.documentElement || document.body;
        return {
            x: window.innerWidth || body.clientWidth,
            y: window.innerHeight || body.clientHeight
        };
    }

    HideImg():void {
        const imgElement = document.getElementById('uploaded-img')!;
        imgElement.style.display = 'none';
    }
}

export { ImageUploader };