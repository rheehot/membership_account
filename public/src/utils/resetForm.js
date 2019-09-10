import Reset from '../components/reset.js';
import routesPage from './routesPage.js';

const reset = {
  init() {
    this.popUpReset();
  },
  popUpReset() {
    const target = document.querySelector('.reset');
    target.addEventListener('click', (e) => {
      document.querySelector('body').insertAdjacentHTML('afterbegin', Reset);
      this.undoReset();
      this.doReset();
    });
  },
  removeReset() {
    const resetBox = document.querySelector('.wrap-modal');
    resetBox.parentElement.removeChild(resetBox);
  },
  undoReset() {
    const target = document.querySelector('.btn-reset .undo-btn');
    target.addEventListener('click', () => {
      this.removeReset();
    });
  },
  doReset() {
    const target = document.querySelector('.btn-reset .reset-btn');
    target.addEventListener('click', async (e) => {
      this.removeReset();
      await routesPage('/signin');
    });
  },
};
export default reset;
