class Modal {
    private modalElement: HTMLDivElement;
    private contentElement: HTMLDivElement;
    private headerElement: HTMLDivElement;
    private bodyElement: HTMLDivElement;
    private footerElement: HTMLDivElement;    
    private closeButton: HTMLButtonElement;

    constructor(id: string, title: string, content: string | HTMLElement, onSubmit: () => void) {
        this.modalElement = document.createElement('div');
        this.modalElement.classList.add('modal');

        this.contentElement = document.createElement('div');
        this.contentElement.classList.add('modal-content');
        this.modalElement.appendChild(this.contentElement);

        this.headerElement =  document.createElement('div');
        this.headerElement.classList.add('modal-header');
        const titleElement = document.createElement('h4');
        titleElement.innerText = title;
        this.contentElement.appendChild(this.headerElement);
        this.headerElement.appendChild(titleElement);

        this.bodyElement =  document.createElement('div');
        this.bodyElement.classList.add('modal-body');
        if (typeof content === 'string') {
            this.bodyElement.innerHTML = content;
        } else {
            this.bodyElement.appendChild(content);
        }
        this.contentElement.appendChild(this.bodyElement);

        this.closeButton = document.createElement('button');
        this.closeButton.classList.add('modal-close');
        this.closeButton.innerText = '×';
        this.closeButton.onclick = () => this.close();
        this.headerElement.appendChild(this.closeButton);

        this.footerElement = document.createElement('div');
        this.footerElement.classList.add('modal-footer');
        this.contentElement.appendChild(this.footerElement);

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';
        submitButton.onclick = () => {
            onSubmit();
            this.close();
        };
        this.footerElement.appendChild(submitButton);

        document.body.appendChild(this.modalElement);
    }

    open() {
        this.modalElement.style.display = 'block';
    }

    close() {
        document.body.removeChild(this.modalElement);
        this.modalElement.style.display = 'none';
    }
}

export { Modal };