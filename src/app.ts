import { Modal } from './modal.js';

function initUploadPictureModal() {
  const uploadBtn = document.getElementById('upload-btn') as HTMLButtonElement;
  uploadBtn.addEventListener('click', () => {
    const content = `
          <input type="file" id="image-input" accept="image/*">
      `;
      const modal = new Modal('Upload image', content, () => {
        console.log("image uploaded")
      });
      modal.open();
  });
}
initUploadPictureModal();