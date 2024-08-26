import { Cell } from "./Cell.js";

class PicturePuzzle {
    private parentEl: HTMLElement;
    private el!: HTMLElement;
    private imageSrc: string;
    private width: number;
    private height: number = 0;
    private dimmension: number;
    private cells: Cell[] = [];
    private shuffling: boolean = false;
    private numberOfMovements: number = 0;

    // Events
    public onFinished: () => void = () => {};
    public onSwap: (numberOfMovements: number) => void = () => {};

    constructor(el: HTMLElement, imageSrc: string, width: number, dimmension: number = 3) {
        this.parentEl = el;
        this.imageSrc = imageSrc;
        this.width = width;
        this.dimmension = dimmension;

        this.init();
        
        const img = new Image();
        img.onload = () => {
            console.log(img.width, img.height);
            this.height = (img.height * this.width) / img.width;
            this.el.style.width = `${this.width}px`;
            this.el.style.height = `${this.height}px`;

            this.setup();
        };
        img.src = this.imageSrc;
    }

    private init(): void {
        this.el = this.createWrapper();
        this.parentEl.appendChild(this.el);
    }

    private createWrapper(): HTMLElement {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.margin = '0 auto';
        return div;
    }

    private setup(): void {
        for (let i = 0; i < this.dimmension * this.dimmension; i++) {
            this.cells.push(new Cell(this, i));
        }
        this.shuffle();
    }

    private shuffle(): void {
        this.shuffling = true;
        for (let i = this.cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swapCells(i, j);
        }
        this.shuffling = false;
    }

    public swapCells(i: number, j: number, animate: boolean = false): void {
        this.cells[i].SetPosition(j, animate, i);
        this.cells[j].SetPosition(i);
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];

        if (!this.shuffling && this.isAssembled()) {
            if (this.onFinished && typeof this.onFinished === 'function') {
                this.onFinished.call(this);
            }
        }
    }

    private isAssembled(): boolean {
        for (let i = 0; i < this.cells.length; i++) {
            if (i !== this.cells[i].index) {
                if (i === 6 && this.cells[i].index === 8 && this.cells[i + 1].index === i + 1) {
                    return true;
                }
                return false;
            }
        }
        return true;
    }

    public findPosition(ind: number): number {
        return this.cells.findIndex(cell => cell.index === ind);
    }

    public findEmpty(): number {
        return this.cells.findIndex(cell => cell.isEmpty);
    }
}
export { PicturePuzzle };