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
            console.log(img.width, img.height);
            //calc picture size
            this.height = (img.height * this.width) / img.width;
            this.wrapper.style.width = `${this.width}px`;
            this.wrapper.style.height = `${this.height}px`;

            this.setup();
        };
        img.src = this.imageSrc;
    }

    private setup(): void {
        for (let i = 0; i < this.dimmension * this.dimmension; i++) {
            this.cells.push(new PuzzleCell(this, i));
        }
        this.shuffle();
    }

    private shuffle(): void {
        for (let i = this.cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swapCells(i, j, true);
        }
    }

    public swapCells(i: number, j: number, isShuffling: boolean = false): void {
        this.cells[i].setPosition(j);
        this.cells[j].setPosition(i);
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

    private isAssembled(): boolean {
        let isAssembled = true;
        console.log('isAssembled check');
        for (let i = 0; i < this.cells.length; i++) {
            if (i != this.cells[i].getIndex()) {
                isAssembled = false;
                break;
            }
            console.log(`i=${i}, index=${this.cells[i].getIndex()}`);
        }
        return isAssembled;
    }
}

export { PuzzleGame };
