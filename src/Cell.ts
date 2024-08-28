class Cell {
    isEmpty: boolean;
    index: number;
    private puzzle: any;
    private width: number;
    private height: number;
    private el: HTMLDivElement;

    constructor(puzzle: any, ind: number) {
        this.isEmpty = false;
        this.index = ind;
        this.puzzle = puzzle;
        this.width = this.puzzle.width / this.puzzle.dimmension;
        this.height = this.puzzle.height / this.puzzle.dimmension;

        this.el = this.createDiv();
        this.puzzle.el.appendChild(this.el);

        if (this.index === this.puzzle.dimmension * this.puzzle.dimmension - 1) {
            this.isEmpty = true;
            return;
        }

        this.setImage();
        this.SetPosition(this.index);
    }

    private createDiv(): HTMLDivElement {
        const div = document.createElement('div');
        div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
        div.style.border = '1px solid #FFF';
        div.style.position = 'absolute';
        div.style.transition = 'top 0.3s ease, left 0.3s ease';

        div.onclick = () => {
            const currentCellIndex = this.puzzle.findPosition(this.index);
            const emptyCellIndex = this.puzzle.findEmpty();
            this.puzzle.numberOfMovements++;
            if (this.puzzle.onSwap) {
                this.puzzle.onSwap(this.puzzle.numberOfMovements);
            }
            this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
        };

        return div;
    }

    private setImage(): void {
        const { x, y } = this.getXY(this.index);
        const left = this.width * x;
        const top = this.height * y;

        this.el.style.width = `${this.width}px`;
        this.el.style.height = `${this.height}px`;

        this.el.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
        this.el.style.backgroundPosition = `-${left}px -${top}px`;
    }

    SetPosition(destinationIndex: number, animate: boolean = false, currentIndex?: number): void {
        const { left, top } = this.getPositionFromIndex(destinationIndex);
        const { left: currentLeft, top: currentTop } = this.getPositionFromIndex(currentIndex || destinationIndex);

        if (animate) {
            if (left !== currentLeft) {
                this.animate('left', currentLeft, left);
            } else if (top !== currentTop) {
                this.animate('top', currentTop, top);
            }
        } else {
            this.el.style.left = `${left}px`;
            this.el.style.top = `${top}px`;
        }
    }

    private animate(position: 'left' | 'top', currentPosition: number, destination: number): void {
        const animationDuration = 500;
        const frameRate = 10;
        let step = frameRate * Math.abs(destination - currentPosition) / animationDuration;

        let id = setInterval(() => {
            if (currentPosition < destination) {
                currentPosition = Math.min(destination, currentPosition + step);
                if (currentPosition >= destination) {
                    clearInterval(id);
                }
            } else {
                currentPosition = Math.max(destination, currentPosition - step);
                if (currentPosition <= destination) {
                    clearInterval(id);
                }
            }

            this.el.style[position] = currentPosition + 'px';
        }, frameRate);
    }

    private getPositionFromIndex(index: number): { left: number; top: number } {
        const { x, y } = this.getXY(index);
        return {
            left: this.width * x,
            top: this.height * y
        };
    }

    private getXY(index: number): { x: number; y: number } {
        return {
            x: index % this.puzzle.dimmension,
            y: Math.floor(index / this.puzzle.dimmension)
        };
    }
}

export { Cell };
