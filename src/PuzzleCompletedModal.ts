import { Modal } from './Modal.js';

export class PuzzleCompletedModal {
    private modal: Modal | null = null;

    Start():void {
        const content = `
            <h3 class='puzzle-completed-modal-content'>Well done! You have completed puzzle!!!</h3>
        `;
        this.modal = new Modal('puzzle-completed-modal', 'Congratulations!!!', content, 'OK', () => {
        });

        this.modal.open();
    }


}