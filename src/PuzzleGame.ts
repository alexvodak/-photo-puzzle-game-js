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
                piece.setAttribute('data-position', `${row}-${col}`);
                this.puzzleContainer.appendChild(piece);
                this.pieces.push(piece);
            }
        }
        this.shufflePuzzle();
        this.addDragAndDropFunctionality();
    }

    private shufflePuzzle(): void {
        this.pieces.forEach(piece => {
            const randomX = Math.floor(Math.random() * 300);
            const randomY = Math.floor(Math.random() * 300);
            piece.style.position = 'absolute';  // Ensure pieces are positioned absolutely
            piece.style.left = `${randomX}px`;
            piece.style.top = `${randomY}px`;
        });
    }

    private addDragAndDropFunctionality(): void {
        let draggedPiece: HTMLElement | null = null;

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

            piece.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            piece.addEventListener('drop', (e) => {
                e.preventDefault();
                const targetPiece = e.target as HTMLElement;

                if (draggedPiece && targetPiece !== draggedPiece) {
                    const draggedPos = { left: draggedPiece.style.left, top: draggedPiece.style.top };
                    draggedPiece.style.left = targetPiece.style.left;
                    draggedPiece.style.top = targetPiece.style.top;
                    targetPiece.style.left = draggedPos.left;
                    targetPiece.style.top = draggedPos.top;

                    this.checkIfPuzzleSolved();
                }
            });
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
}
// const puzzleGame = new PuzzleGame('https://via.placeholder.com/400', 4, 4, 'puzzle-container');
export { PuzzleGame };
