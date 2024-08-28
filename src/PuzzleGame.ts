import { PuzzleCell } from './PuzzleCell.js';

class PuzzleGame {
    private parentEl: HTMLElement;
    private wrapper!: HTMLElement;
    private imageSrc: string;
    private width: number;
    private height: number = 0;
    private dimmension: number;
    private cells: PuzzleCell[] = [];
    public onFinished: () => void = () => {};

    constructor(parentEl: HTMLElement, imageSrc: string, width: number, dimmension: number = 3) {
        this.parentEl = parentEl;
        this.imageSrc = imageSrc;
        this.width = width;
        this.dimmension = dimmension;
        this.initWrapper();
        this.initImage();
    }

    public swapCells(i: number, j: number, isShuffling: boolean = false): void {
        this.cells[i].setScreenDisplayPosition(j);
        this.cells[j].setScreenDisplayPosition(i);
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
        if (!isShuffling && this.isAssembled()) {
            this.onFinished.call(this);
        }
    }

    public findPosition(ind: number): number {
        return this.cells.findIndex(cell => cell.getIndex() === ind);
    }

    public findEmpty(): number {
        return this.cells.findIndex(cell => cell.getIsEmpy());
    }

    private initWrapper(): void {
        this.wrapper = this.createWrapper();
        this.parentEl.appendChild(this.wrapper);
    }

    private createWrapper(): HTMLElement {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.margin = '0 auto';
        return div;
    }

    private initImage(): void {
        const img = new Image();
        img.onload = () => {
            this.initImageStyles(img);
            this.setup();
            this.shuffle();
        };
        img.src = this.imageSrc;
    }

    private initImageStyles(img: any) {
        this.height = (img.height * this.width) / img.width;
        this.wrapper.style.width = `${this.width}px`;
        this.wrapper.style.height = `${this.height}px`;
    }

    private setup(): void {
        for (let i = 0; i < this.dimmension * this.dimmension; i++) {
            this.cells.push(new PuzzleCell(this, i));
        }
    }

    private shuffle(): void {
        for (let i = this.cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swapCells(i, j, true);
        }
    }

    private isAssembled(): boolean {
        let isAssembled = true;
        for (let i = 0; i < this.cells.length; i++) {
            if (i != this.cells[i].getIndex()) {
                isAssembled = false;
                break;
            }
        }
        return isAssembled;
    }
}

export { PuzzleGame };
