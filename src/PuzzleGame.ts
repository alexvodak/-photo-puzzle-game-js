class PuzzleGame {
    private imageUrl: string;
    private rows: number;
    private cols: number;
    private puzzleContainer: HTMLElement;
    private pieces: HTMLElement[] = [];
    private pieceSize = 100; // Assuming each piece is 100x100 pixels

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
                piece.style.backgroundPosition = `-${col * this.pieceSize}px -${row * this.pieceSize}px`;
                piece.style.width = `${this.pieceSize}px`;
                piece.style.height = `${this.pieceSize}px`;
                piece.style.position = 'absolute';
                piece.setAttribute('data-position', `${row}-${col}`);
                this.puzzleContainer.appendChild(piece);
                this.pieces.push(piece);
            }
        }
        this.createPuzzleContainer();
        this.shufflePuzzle(); // Randomly shuffle pieces
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
        const containerWidth = container.offsetWidth - this.pieceSize;
        const containerHeight = container.offsetHeight - this.pieceSize;

        this.pieces.forEach(piece => {
            // Generate random x and y positions within the container bounds
            const randomX = Math.floor(Math.random() * (containerWidth + 1));
            const randomY = Math.floor(Math.random() * (containerHeight + 1));

            piece.style.left = `${randomX}px`;
            piece.style.top = `${randomY}px`;
            container.appendChild(piece); // Place pieces inside the puzzle piece container
        });
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
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedPiece) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const snappedX = Math.round(x / this.pieceSize) * this.pieceSize;
                const snappedY = Math.round(y / this.pieceSize) * this.pieceSize;

                if (!this.isGridCellOccupied(snappedX, snappedY)) {
                    draggedPiece.style.left = `${snappedX}px`;
                    draggedPiece.style.top = `${snappedY}px`;
                } else {
                    console.log('Cell is occupied. Please choose another cell.');
                }

                this.checkIfPuzzleSolved();
            }
        });
    }

    private isGridCellOccupied(x: number, y: number): boolean {
        let occupied = false;
        this.pieces.forEach(piece => {
            const left = parseInt(piece.style.left, 10);
            const top = parseInt(piece.style.top, 10);
            if (left === x && top === y) {
                occupied = true;
            }
        });
        return occupied;
    }

    private checkIfPuzzleSolved(): void {
        let isSolved = true;

        this.pieces.forEach(piece => {
            const pos = piece.getAttribute('data-position')!.split('-');
            const left = parseInt(piece.style.left, 10);
            const top = parseInt(piece.style.top, 10);

            const correctLeft = parseInt(pos[1]) * this.pieceSize;
            const correctTop = parseInt(pos[0]) * this.pieceSize;

            if (left !== correctLeft || top !== correctTop) {
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
