import { Modal } from './modal.js';

function initUploadPictureModal() {
  const uploadBtn = document.getElementById('upload-btn') as HTMLButtonElement;
  uploadBtn.addEventListener('click', () => {
    const content = `
          <input type="file" id="upload-image" accept="image/*">
      `;
      const modal = new Modal('upload-modal', 'Upload image', content, () => {
        const fileInput = document.getElementById('upload-image') as HTMLInputElement;
        const file = fileInput.files ? fileInput.files[0] : null;
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const puzzleContainer = document.getElementById('puzzle-container')!;
              const imgElement = document.createElement('img');
              imgElement.src = e.target!.result as string;
              imgElement.style.display = 'block';
              puzzleContainer.innerHTML = '';
              puzzleContainer.appendChild(imgElement);
              resizeImageToFitScreen(imgElement);
          };
          reader.readAsDataURL(file);
      }
        console.log("image uploaded");
      });
      modal.open();
  });
}

function resizeImageToFitScreen(imgElement: HTMLImageElement)
{
  const winDim = getWinDim();
  imgElement.style.height = winDim.y + "px";
  if (imgElement.offsetWidth > winDim.x)
  {
    imgElement.style.width = winDim.x + "px";
  }
}

function getWinDim()
{
    var body = document.documentElement || document.body;

    return {
        x: window.innerWidth  || body.clientWidth,
        y: window.innerHeight || body.clientHeight
    }
}

initUploadPictureModal();