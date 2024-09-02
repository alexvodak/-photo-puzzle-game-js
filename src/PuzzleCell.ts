export class PuzzleCell {
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

        this.setImageDisplayPosition();
        this.setScreenDisplayPosition(this.index);
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
        div.style.transition = 'top 0.3s ease, left 0.3s ease';

        div.onclick = () => {
            const currentArrayIndex = this.puzzle.findPosition(this.index);
            const emptyArrayIndex = this.puzzle.findEmpty();
            this.puzzle.swapCells(currentArrayIndex, emptyArrayIndex);
        };

        return div;
    }

    private setImageDisplayPosition(): void {
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

    public setScreenDisplayPosition(destinationIndex: number) {
        const { left, top } = this.getPositionFromIndex(destinationIndex);
        this.div.style.left = `${left}px`;
        this.div.style.top = `${top}px`;
    }
}