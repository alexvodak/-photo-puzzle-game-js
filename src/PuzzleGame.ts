class PuzzleGame {
    private imageUrl: string;
    private rows: number;
    private cols: number;
    private puzzleContainer: HTMLElement;
    private pieces: HTMLElement[] = [];

    constructor(imageUrl: string, rows: number, cols: number, containerId: string) {
        this.imageUrl = imageUrl;
        this.rows = rows;
        this.cols = cols;
        this.puzzleContainer = document.getElementById(containerId) as HTMLElement;
        this.createPuzzle();
    }

    private createPuzzle(): void {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.backgroundImage = `url(${this.imageUrl})`;
                piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
                piece.style.width = `${100}px`;
                piece.style.height = `${100}px`;
                piece.style.position = 'absolute';
                piece.setAttribute('data-position', `${row}-${col}`);
                this.puzzleContainer.appendChild(piece);
                this.pieces.push(piece);
            }
        }
        this.createPuzzleContainer();
        this.shufflePuzzle();
        this.addDragAndDropFunctionality();
    }

    private createPuzzleContainer(): void {
        const imgElement = document.getElementById('uploaded-img') as HTMLImageElement;
        const puzzlePieceContainer = document.createElement('div');
        puzzlePieceContainer.id = 'puzzle-piece-container';
        puzzlePieceContainer.style.position = 'relative';
        puzzlePieceContainer.style.width = `${imgElement.style.width}`;
        puzzlePieceContainer.style.height = `${imgElement.style.height}`;
        puzzlePieceContainer.style.border = '1px solid #000';
        puzzlePieceContainer.style.marginTop = '20px';
        this.puzzleContainer.appendChild(puzzlePieceContainer);
    }

    private shufflePuzzle(): void {
        const container = document.getElementById('puzzle-piece-container') as HTMLElement;
        const winDim = this.getWinDim();
        let currentRow = 1;
        let y = winDim.y - 100;
        let x = 100;
        this.pieces.forEach(piece => {
            piece.style.left = `${x}px`;
            piece.style.top = `${y}px`;
            container.appendChild(piece); // Place pieces inside the puzzle piece container
            x += 120;
            if (x >= winDim.x - 100) {
                currentRow++;
                y = winDim.y - 100 * currentRow;
                x = 100;
            }
        });
    }

    private getWinDim(): { x: number, y: number } {
        const body = document.documentElement || document.body;
        return {
            x: window.innerWidth || body.clientWidth,
            y: window.innerHeight || body.clientHeight
        };
    }

    private addDragAndDropFunctionality(): void {
        let draggedPiece: HTMLElement | null = null;
        const container = document.getElementById('puzzle-piece-container') as HTMLElement;

        this.pieces.forEach(piece => {
            piece.setAttribute('draggable', 'true'); // Make pieces draggable

            piece.addEventListener('dragstart', () => {
                draggedPiece = piece;
                piece.classList.add('dragging');
            });

            piece.addEventListener('dragend', () => {
                if (draggedPiece) {
                    draggedPiece.classList.remove('dragging');
                    draggedPiece = null;
                }
            });
        });

        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            console.log('x: ' + e.clientX  + 'y: ' + e.clientY);
            console.log();
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedPiece) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                draggedPiece.style.left = `${x}px`;
                draggedPiece.style.top = `${y}px`;

                this.checkIfPuzzleSolved();
            }
        });
    }

    private checkIfPuzzleSolved(): void {
        let isSolved = true;

        this.pieces.forEach(piece => {
            const pos = piece.getAttribute('data-position')!.split('-');
            const left = parseInt(piece.style.left, 10);
            const top = parseInt(piece.style.top, 10);

            if (left !== parseInt(pos[1]) * 100 || top !== parseInt(pos[0]) * 100) {
                isSolved = false;
            }
        });

        if (isSolved) {
            setTimeout(() => {
                alert('Congratulations! You solved the puzzle!');
            }, 100);
        }
    }

    public Cleanup(): void {
        // Implement cleanup if necessary
    }
}

export { PuzzleGame };
