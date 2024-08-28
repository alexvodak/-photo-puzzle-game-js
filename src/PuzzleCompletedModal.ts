import { Modal } from './Modal.js';

class PuzzleCompletedModal {
    private modal: Modal | null = null;
    private url: string | null = null;

    Start():void {
        const content = `
            <h3 class='puzzle-completed-modal-content'>Well done! You have completed puzzle!!!</h3>
        `;
        this.modal = new Modal('puzzle-completed-modal', '', content, () => {
        });

        this.modal.open();
    }


}

export { PuzzleCompletedModal };