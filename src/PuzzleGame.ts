
class PuzzleCell {
    private isEmpty: boolean;
    private index: number;
    private puzzle: any;
    private width: number;
    private height: number;
    private div: HTMLDivElement;

    constructor(puzzle: any, index: number) {
        this.puzzle = puzzle;
        this.index = index;
        this.width = this.puzzle.width / this.puzzle.dimmension;
        this.height = this.puzzle.height / this.puzzle.dimmension;

        this.div = this.createDiv();
        this.puzzle.parentEl.appendChild(this.div);

        this.isEmpty = false;
        if (this.index === this.puzzle.dimmension * this.puzzle.dimmension - 1) {
            this.isEmpty = true;
            return;
        }

        this.setImage();
        this.setPosition(this.index);
    }

    getIsEmpy(): boolean {
        return this.isEmpty;
    }

    getIndex(): number {
        return this.index;
    }

    private createDiv(): HTMLDivElement {
        const div = document.createElement('div');
        div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
        div.style.border = '1px solid #FFF';
        div.style.position = 'absolute';

        div.onclick = () => {
            console.log(`clicked: ${this.index}`);
            const current = this.puzzle.findPosition(this.index);
            console.log(`current: ${current}`);
            const empty = this.puzzle.findEmpty();
            console.log(`empty: ${empty}`);
            this.puzzle.swapCells(current, empty);
        };

        return div;
    }

    private setImage(): void {
        const { x, y } = this.getXY(this.index);
        const left = this.width * x;
        const top = this.height * y;

        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;

        this.div.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
        this.div.style.backgroundPosition = `-${left}px -${top}px`;
    }

    //get absolute pos by index
    private getPositionFromIndex(index: number): { left: number; top: number } {
        const { x, y } = this.getXY(index);
        return {
            left: this.width * x,
            top: this.height * y
        };
    }

    //get 2 dimension XY of the picture to show
    private getXY(index: number): { x: number; y: number } {
        return {
            x: index % this.puzzle.dimmension,
            y: Math.floor(index / this.puzzle.dimmension)
        };
    }

    setPosition(destinationIndex: number) {
        const { left, top } = this.getPositionFromIndex(destinationIndex);
        this.div.style.left = `${left}px`;
        this.div.style.top = `${top}px`;
    }
}

class PuzzleGame {
    private parentEl: HTMLElement;
    private wrapper!: HTMLElement;
    private imageSrc: string;
    private width: number;
    private height: number = 0;
    private dimmension: number;
    private cells: PuzzleCell[] = [];

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
            this.swapCells(i, j);
        }
    }

    public swapCells(i: number, j: number): void {
        this.cells[i].setPosition(j);
        this.cells[j].setPosition(i);
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    }

    public findPosition(ind: number): number {
        return this.cells.findIndex(cell => cell.getIndex() === ind);
    }

    public findEmpty(): number {
        return this.cells.findIndex(cell => cell.getIsEmpy());
    }

    private isAssembled(): boolean {
        for (let i = 0; i < this.cells.length; i++) {
            
        }
        return true;
    }
}

export { PuzzleGame };
